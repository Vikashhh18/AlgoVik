
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, RotateCcw, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import axios from 'axios';
// import { baseUrl } from '../../../utils/getUrl';
import { baseUrl } from '../utils/getUrl';

const ProblemViewer = ({ problem, onBack, onSolved }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [problemDetails, setProblemDetails] = useState(null);
  const [isLoadingProblem, setIsLoadingProblem] = useState(true);

  const languageIds = {
    python: 71,
    cpp: 54,
    java: 62,
    javascript: 63
  };

  // Fetch problem details on mount
  useEffect(() => {
    const fetchProblemDetails = async () => {
      setIsLoadingProblem(true);
      try {
        const response = await axios.get(`${baseUrl}/api/problems/details`, {
          params: { title: problem.title }
        });
        
        if (response.data.success) {
          setProblemDetails(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch problem details:', error);
        // Use fallback data
        setProblemDetails({
          title: problem.title,
          difficulty: problem.difficulty,
          description: 'Problem description could not be loaded. Please check the LeetCode link for details.',
          examples: [],
          constraints: [],
          codeTemplates: getDefaultCodeTemplates()
        });
      } finally {
        setIsLoadingProblem(false);
      }
    };

    fetchProblemDetails();
  }, [problem.title]);

  // Update code when language or problem changes
  useEffect(() => {
    if (problemDetails?.codeTemplates?.[language]) {
      setCode(problemDetails.codeTemplates[language]);
    } else {
      setCode(getDefaultCodeTemplate(language));
    }
  }, [language, problemDetails]);

  const getDefaultCodeTemplates = () => ({
    python: `def solution():
    # Write your solution here
    pass`,
    cpp: `class Solution {
public:
    // Write your solution here
};`,
    java: `class Solution {
    // Write your solution here
}`,
    javascript: `/**
 * @return {}
 */
var solution = function() {
    // Write your solution here
};`
  });

  const getDefaultCodeTemplate = (lang) => {
    const templates = getDefaultCodeTemplates();
    return templates[lang] || templates.python;
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');

    try {
      const response = await axios.post(`${baseUrl}/api/code-runner`, {
        language,
        code,
        input
      });

      const { output: result, error, status, executionTime, memory } = response.data;
      
      let displayOutput = result;
      if (error) {
        displayOutput = `${error}\n\n${result}`;
      }
      
      if (executionTime || memory) {
        displayOutput += `\n\n--- Execution Stats ---`;
        if (executionTime) displayOutput += `\nTime: ${executionTime}s`;
        if (memory) displayOutput += `\nMemory: ${memory} KB`;
      }

      setOutput(displayOutput);
    } catch (error) {
      console.error('Code execution error:', error);
      setOutput(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    // Mock submission with test cases
    setIsRunning(true);
    
    try {
      // You can implement actual test case validation here
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      const passed = Math.random() > 0.3; // 70% success rate for demo
      
      setTestResults({
        passed: passed ? 3 : 2,
        total: 3,
        status: passed ? 'Accepted' : 'Wrong Answer',
        results: [
          { input: 'Test Case 1', expected: 'Expected 1', actual: 'Actual 1', passed: true },
          { input: 'Test Case 2', expected: 'Expected 2', actual: 'Actual 2', passed: true },
          { input: 'Test Case 3', expected: 'Expected 3', actual: 'Actual 3', passed: passed }
        ]
      });

      if (passed && onSolved) {
        onSolved(problem.title);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (problemDetails?.codeTemplates?.[language]) {
      setCode(problemDetails.codeTemplates[language]);
    } else {
      setCode(getDefaultCodeTemplate(language));
    }
    setOutput('');
    setTestResults(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'text-red-600 bg-red-100 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 border-gray-200 dark:bg-gray-700/30 dark:text-gray-400';
    }
  };

  const renderProblemContent = () => {
    if (isLoadingProblem) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading problem details...</span>
          </div>
        </div>
      );
    }

    if (!problemDetails) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Failed to load problem details.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Description */}
        <div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {problemDetails.description}
          </p>
        </div>

        {/* Examples */}
        {problemDetails.examples && problemDetails.examples.length > 0 && (
          <div className="space-y-4">
            {problemDetails.examples.map((example, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Example {idx + 1}:
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Input:</strong>{' '}
                    <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                      {example.input}
                    </code>
                  </div>
                  <div>
                    <strong>Output:</strong>{' '}
                    <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                      {example.output}
                    </code>
                  </div>
                  {example.explanation && (
                    <div>
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Constraints */}
        {problemDetails.constraints && problemDetails.constraints.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Constraints:
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {problemDetails.constraints.map((constraint, idx) => (
                <li key={idx}>• {constraint}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Hints */}
        {problemDetails.hints && problemDetails.hints.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Hints:
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {problemDetails.hints.map((hint, idx) => (
                <li key={idx} className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                  <strong>Hint {idx + 1}:</strong> {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Topics */}
        {problemDetails.topics && problemDetails.topics.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Related Topics:
            </h4>
            <div className="flex flex-wrap gap-2">
              {problemDetails.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Topics
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {problemDetails?.id && `${problemDetails.id}. `}{problem.title}
              </h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            {/* Stats */}
            {problemDetails?.likes && (
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>👍 {problemDetails.likes}</span>
                <span>👎 {problemDetails.dislikes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Problem Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'submissions'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Submissions
                </button>
              </nav>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'description' ? (
                renderProblemContent()
              ) : (
                <div className="space-y-4">
                  {testResults && (
                    <div className={`p-4 rounded-lg border ${
                      testResults.status === 'Accepted' 
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20' 
                        : 'bg-red-50 border-red-200 dark:bg-red-900/20'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {testResults.status === 'Accepted' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-semibold">{testResults.status}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testResults.passed} / {testResults.total} test cases passed
                      </p>
                      
                      {testResults.results && (
                        <div className="mt-4 space-y-2">
                          {testResults.results.map((result, idx) => (
                            <div key={idx} className={`p-2 rounded text-xs ${
                              result.passed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                            }`}>
                              <div className="flex items-center gap-2">
                                {result.passed ? (
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                ) : (
                                  <XCircle className="w-3 h-3 text-red-600" />
                                )}
                                <span>Test Case {idx + 1}</span>
                              </div>
                              <div className="mt-1 pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                                <div>Input: {result.input}</div>
                                <div>Expected: {result.expected}</div>
                                <div>Actual: {result.actual}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="python">Python 3</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none resize-none focus:outline-none"
                style={{ minHeight: '300px' }}
                placeholder="Write your code here..."
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Input
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter test input..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output
                  </label>
                  <div className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm font-mono overflow-y-auto whitespace-pre-wrap">
                    {output || 'Run your code to see output...'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div></div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-colors"
                  >
                    {isRunning ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    Run
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-md font-medium transition-colors"
                  >
                    {isRunning ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemViewer;