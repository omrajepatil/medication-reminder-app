import Medicine from "../models/medicine.js";

export const createMedicine = async(req,res)=>{

    const { name, dosage, scheduleTime, userId } = req.body;
    try{
        if (!name || !dosage || !scheduleTime) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
          }
          const newMedicine = await Medicine.create({ name, dosage, scheduleTime, userId });

        res.status(201).json({status:true, message:"Medicine created successfully",data:newMedicine});
    }

    catch(error){
        res.status(400).json({status:false,message:"medicine record not added"})
    }
}



export const fetchAllMedicine = async (req, res) => {
  try {
    const { id } = req.params; // `id` here is the userId
    if (!id) {
      return res.status(400).json({ status: false, message: 'User ID is required' });
    }

    // Fetch medicines where userId matches the provided ID
    const medicines = await Medicine.findAll({ where: { userId: id } });

    if (medicines.length === 0) {
      return res.status(404).json({ status: false, message: 'No medicines found for this user' });
    }

    res.status(200).json({ status: true, message: 'Medicines fetched successfully', data: medicines });
  } catch (error) {
    console.error('Error while fetching medicines:', error);
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};




export const updateMedicine = async (req, res) => {
    try {
      const { id } = req.params; // Assume ID is passed as a route parameter
      const updatedData = req.body; // Assume updated data is passed in the request body
  
      const [updatedRows] = await Medicine.update(updatedData, {
        where: { id }, // Find the record by ID
      });
  
      if (updatedRows > 0) {
        res.status(200).json({status: true,message: "Medicine updated successfully",});
      } else {
        res.status(404).json({status: false,message: "Medicine not found or no changes made",});
      }
    } catch (error) {
      res.status(400).json({status: false,message: "Failed to update medicine",error: error.message});
    }
  };


  export const deleteData = async(req,res)=>{

    try{
        const {id} = req.params;
        const deletedRows = await Medicine.destroy({where:{id}});
        if(deletedRows > 0){
            res.status(200).json({status:true,message:"Medicine deleted successfully",})
        }
        else{
            res.status(404).json({status:false,message:"Medicine not found",})
        }

    }
    catch(error){
        console.log(error);
        
        res.status(400).json({status:false,message:"error occurs while delete medicine"})
    }
  }
  