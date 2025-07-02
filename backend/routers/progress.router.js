import express from 'express'
import { verifyClerk } from '../middleware/verifyClerk.js';
import { createProgressBySheet, getProgressBySheet } from '../controllers/progress.controllers.js';
const router=express.Router();

router.post("/",verifyClerk,createProgressBySheet);
router.get("/",verifyClerk,getProgressBySheet);

export default router;