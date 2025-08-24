import axios from "axios";

const JUDGE0_API = process.env.JUDGE0_API || "https://ce.judge0.com/submissions";
const JUDGE0_HOST = process.env.JUDGE0_HOST || "ce.judge0.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // Optional: for RapidAPI

const languageIds = {
  cpp: 54,       // C++ (GCC 9.2.0)
  python: 71,    // Python 3
  java: 62,      // Java (OpenJDK 13.0.1)
  javascript: 63 // Node.js (12.14.0)
};

export const runCode = async (req, res) => {
  try {
    const { language, code, input } = req.body;

    if (!language || !code) {
      return res.status(400).json({ 
        error: "Language and code are required" 
      });
    }

    const languageId = languageIds[language];
    if (!languageId) {
      return res.status(400).json({ 
        error: "Unsupported language" 
      });
    }

    // 1. Submit code to Judge0
    const submissionData = {
      source_code: code,
      language_id: languageId,
      stdin: input || "",
      expected_output: null
    };

    const headers = {
      "Content-Type": "application/json"
    };

    // Add RapidAPI headers if using RapidAPI
    if (RAPIDAPI_KEY) {
      headers["X-RapidAPI-Key"] = RAPIDAPI_KEY;
      headers["X-RapidAPI-Host"] = JUDGE0_HOST;
    }

    const submission = await axios.post(
      `${JUDGE0_API}?base64_encoded=false&wait=false`,
      submissionData,
      { headers }
    );

    const token = submission.data.token;

    // 2. Poll for result
    let result;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const check = await axios.get(
        `${JUDGE0_API}/${token}?base64_encoded=false`,
        { headers }
      );

      result = check.data;
      
      // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 5=Time Limit Exceeded, etc.
      if (result.status.id >= 3) {
        break; // Processing finished
      }
      
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return res.status(408).json({ 
        error: "Code execution timeout" 
      });
    }

    // 3. Format response
    let output = "";
    let error = null;
    let status = result.status.description;

    if (result.stdout) {
      output = result.stdout;
    } else if (result.stderr) {
      output = result.stderr;
      error = "Runtime Error";
    } else if (result.compile_output) {
      output = result.compile_output;
      error = "Compilation Error";
    } else {
      output = "No output";
    }

    res.json({
      output,
      error,
      status,
      executionTime: result.time,
      memory: result.memory
    });

  } catch (err) {
    console.error("Code execution error:", err);
    
    if (err.response) {
      // Judge0 API error
      return res.status(500).json({ 
        error: `Judge0 API Error: ${err.response.data?.message || err.response.statusText}` 
      });
    }
    
    res.status(500).json({ 
      error: `Server Error: ${err.message}` 
    });
  }
};

// Alternative: Direct Judge0 without polling (wait=true)
export const runCodeDirect = async (req, res) => {
  try {
    const { language, code, input } = req.body;

    if (!language || !code) {
      return res.status(400).json({ 
        error: "Language and code are required" 
      });
    }

    const languageId = languageIds[language];
    if (!languageId) {
      return res.status(400).json({ 
        error: "Unsupported language" 
      });
    }

    const submissionData = {
      source_code: code,
      language_id: languageId,
      stdin: input || ""
    };

    const headers = {
      "Content-Type": "application/json"
    };

    if (RAPIDAPI_KEY) {
      headers["X-RapidAPI-Key"] = RAPIDAPI_KEY;
      headers["X-RapidAPI-Host"] = JUDGE0_HOST;
    }

    // Using wait=true to get immediate response (may timeout for long-running code)
    const response = await axios.post(
      `${JUDGE0_API}?base64_encoded=false&wait=true`,
      submissionData,
      { 
        headers,
        timeout: 30000 // 30 second timeout
      }
    );

    const result = response.data;

    let output = "";
    let error = null;

    if (result.stdout) {
      output = result.stdout;
    } else if (result.stderr) {
      output = result.stderr;
      error = "Runtime Error";
    } else if (result.compile_output) {
      output = result.compile_output;
      error = "Compilation Error";
    } else {
      output = "No output";
    }

    res.json({
      output,
      error,
      status: result.status?.description || "Unknown",
      executionTime: result.time,
      memory: result.memory
    });

  } catch (err) {
    console.error("Code execution error:", err);
    
    if (err.code === 'ECONNABORTED') {
      return res.status(408).json({ 
        error: "Code execution timeout" 
      });
    }
    
    if (err.response) {
      return res.status(500).json({ 
        error: `Judge0 API Error: ${err.response.data?.message || err.response.statusText}` 
      });
    }
    
    res.status(500).json({ 
      error: `Server Error: ${err.message}` 
    });
  }
};