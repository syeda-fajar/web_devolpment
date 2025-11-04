import express from "express";
import {
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  createContact
} from "../controllers/contactController.js";

const router = express.Router()
router.route('/').get(getAllContacts).post(createContact)
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact)
export default router;