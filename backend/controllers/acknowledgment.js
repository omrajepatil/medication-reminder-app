import AcknowledgmentLog from "../models/acknowledgment.js";

export const logAcknowledgment = async (req, res) => {
  try {
    const { userId, medicineId, status } = req.body;

    // Validate required fields
    if (!userId || !medicineId || !status) {
      return res.status(400).json({status: false , message: "userId, medicineId, and status are required."});
    }

    // Validate status value
    if (!['Taken', 'Skipped'].includes(status)) {return res.status(400).json({status: false, message: "Invalid status value. Use 'Taken' or 'Skipped'."});
    }

    // Create new acknowledgment log
    const acknowledgment = await AcknowledgmentLog.create({
      userId,
      medicineId,
      status,
    });

    res.status(201).json({status: true,message: "Acknowledgment logged successfully",data: acknowledgment});
  } 
  catch (error) {res.status(500).json({status: false,message: "Error logging acknowledgment",error: error.message,});
  }
};
