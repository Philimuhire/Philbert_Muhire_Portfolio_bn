import { Router } from 'express';
import { addMessage, getAllContacts, deleteContact } from '../controllers/contactController';

const router = Router();

router.post('/addMessage', addMessage);
router.get('/getAllContacts', getAllContacts);
router.delete('/deleteContact/:id', deleteContact);

export default router;
