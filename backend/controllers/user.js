import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'





const createToken = (role)=>{
    return jwt.sign({ role }, process.env.SECRET_KEY, { expiresIn: '1d'})
}

// Function to create a new user
export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const exist = await User.findOne({where : {email}})
        if(exist){
            return res.status(400).json({ message: 'Email already exists.' });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ message: 'Invalid email.' });
        }

        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password, salt);


        // Create the user in the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // In production, you should hash the password before storing
            role: role || 'user', // Default role is 'user' if none is provided
        });


        const token = createToken(newUser.role)

        res.status(201).json({ message: 'User created successfully', data: newUser,token });
    } catch (error) {
        // Handle unique constraint or other errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already exists' });
        }

        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Request Body:', req.body); // Debugging
    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: `User with email ${email} not found.` });
        }
        console.log('User Found:', user);

        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('Password Valid:', isValidPassword); // Debugging
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Create a token
        const token = createToken(user.role);

        // Return response excluding sensitive fields
        const { id, name, role } = user;
        res.status(200).json({ 
            message: 'Logged in successfully', 
            data: { id, name, email, role }, 
            token 
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};
