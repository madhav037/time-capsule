import express from 'express';
import { login, logout, signup, sendPing } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get("/ping", sendPing)


export default router;