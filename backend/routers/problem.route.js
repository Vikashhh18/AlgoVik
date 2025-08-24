// routers/problem.router.js
import express from 'express';
import { getProblemDetails } from '../controllers/problemController.js';
// import { getProblemDetails } from '../controllers/problemController.js';

const problemRouter = express.Router();

// GET /api/problems/details?title=Problem+Title
problemRouter.get('/details', getProblemDetails);

export default problemRouter;