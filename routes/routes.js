import express from 'express';
import {
  createContactusController,
  deleteContactusController,
  getAllContactusController,
  updateContactusController
} from '../controller/Contact.js';

const router = express.Router();

router.post("/contactus/create_contactus", createContactusController);
router.get("/contactus/getcontactus", getAllContactusController);
router.put("/contactus/update_contactus/:id", updateContactusController);
router.delete("/contactus/delete_contactus/:id", deleteContactusController);

export default router;
