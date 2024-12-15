import jwt from "jsonwebtoken";

export const authMiddleware = async(req,res,next)=>{

    const authHeader  = req.headers.authorization;

    console.log("authHeader",authHeader);
    

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: "Not authorized, please log in again" });
    }
    
    const token  = authHeader.split(' ')[1];
    console.log("token_decoded",token)

    try{
        const token_decoded = jwt.verify(token,process.env.SECRET_KEY);
        console.log("token",token_decoded)
        req.body.userId  = token_decoded.id;
        console.log("userId",token_decoded)
        next();
    }

    catch(error){
        return res.json({ success: false, message: "Not authorized, please log in again"})
    }

}