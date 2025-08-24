import React, { useState } from "react";

const JUDGE0_API = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

const Compiler = () => {
  const [code, setCode] = useState(`print("Hello, World!")`);
  const [languageId, setLanguageId] = useState(71); // 71 = Python 3
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setOutput("Running...");

    try {
      const response = await fetch(JUDGE0_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: input
        })
      });

      const data = await response.json();
      console.log("Result:", data);

      if (data.stdout) setOutput(data.stdout);
      else if (data.stderr) setOutput(data.stderr);
      else if (data.compile_output) setOutput(data.compile_output);
      else setOutput("Unknown error");
    } catch (error) {
      console.error(error);
      setOutput("Error connecting to Judge0 API");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Online Compiler (Judge0)</h2>

      <select
        className="border p-2 my-2"
        value={languageId}
        onChange={(e) => setLanguageId(Number(e.target.value))}
      >
        <option value={71}>Python 3</option>
        <option value={54}>C++</option>
        <option value={62}>Java</option>
        <option value={63}>JavaScript</option>
      </select>

      <textarea
        className="w-full border p-2 my-2"
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <textarea
        className="w-full border p-2 my-2"
        rows={3}
        placeholder="Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleRun}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Run
      </button>

      <h3 className="mt-4 font-semibold">Output:</h3>
      <pre className="bg-gray-200 p-2">{output}</pre>
    </div>
  );
};

export default Compiler;
