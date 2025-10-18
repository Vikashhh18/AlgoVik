import express from 'express'
import { getAllExpereince, postExpereince } from '../controllers/InterviewExperience.js';
// import { verifyClerk } from '../middleware/verifyClerk.js';

const expereinceRouter=express.Router();

expereinceRouter.get("/",getAllExpereince);
expereinceRouter.post("/share-experience",postExpereince);

export default expereinceRouter;