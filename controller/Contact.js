import {
  createContactusService,
  getAllContactusService,
  updateContactusService,
  deleteContactusService
} from "../services/ContactService.js";
import { sendAdminContactReference, sendUserContactAcknowledgment } from "../utils/sendEmail.js";

// Create
export const createContactusController = async (req, res) => {
  try {

        const { name, email, message } = req.body;

         await Promise.all([
      sendUserContactAcknowledgment({ userEmail: email, userName: name }),
      sendAdminContactReference({ userName: name, userEmail: email, message }),
    ]);

    const result = await createContactusService(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("Create Contact Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update
export const updateContactusController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateContactusService(id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Update Contact Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete
export const deleteContactusController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteContactusService(id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Contact Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all
export const getAllContactusController = async (req, res) => {
  try {
    const data = await getAllContactusService();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Get Contact Info Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
