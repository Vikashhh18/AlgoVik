import express from 'express';
import { getAllMock, getDataOfMock, storedResult } from '../controllers/Mock.controllers.js';
import { verifyClerk } from '../middleware/verifyClerk.js';

const mockRouter=express.Router();

mockRouter.post("/",verifyClerk,storedResult);
mockRouter.get("/:userId",verifyClerk,getAllMock);
mockRouter.get("/data/:userId",verifyClerk,getDataOfMock);

export default mockRouter