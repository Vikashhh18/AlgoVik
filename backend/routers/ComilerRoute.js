import express from 'express';
import {runCode, runCodeDirect } from '../controllers/Comiler.controllers.js';
// import { runCode, runCodeDirect } from '../controllers/codeRunnerController.js';

const codeRunnerRoutes = express.Router();

// POST /api/code-runner
codeRunnerRoutes.post('/', runCodeDirect); // or use runCode for polling approach

export default codeRunnerRoutes;

// Add to your main app.js or server.js
/*
import codeRunnerRoutes from './routes/codeRunner.js';

app.use('/api/code-runner', codeRunnerRoutes);
*/