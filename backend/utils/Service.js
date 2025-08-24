// services/problemDataService.js
import axios from 'axios';

// LeetCode GraphQL endpoint
const LEETCODE_API = 'https://leetcode.com/graphql';

// Cache to store fetched problems
const problemCache = new Map();

/**
 * Fetch problem details from LeetCode
 * @param {string} titleSlug - LeetCode problem slug (e.g., "two-sum")
 * @returns {Promise<Object>} Problem details
 */
export const fetchProblemDetails = async (titleSlug) => {
  // Check cache first
  if (problemCache.has(titleSlug)) {
    return problemCache.get(titleSlug);
  }

  try {
    const query = `
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          title
          titleSlug
          content
          difficulty
          likes
          dislikes
          topicTags {
            name
            slug
          }
          hints
          exampleTestcases
          constraints
          companyTagStats
          codeSnippets {
            lang
            langSlug
            code
          }
          sampleTestCase
          metaData
        }
      }
    `;

    const response = await axios.post(LEETCODE_API, {
      query,
      variables: { titleSlug }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; ProblemFetcher/1.0)',
      }
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    const problem = response.data.data.question;
    
    if (!problem) {
      throw new Error('Problem not found');
    }

    // Parse and format the problem data
    const formattedProblem = formatProblemData(problem);
    
    // Cache the result
    problemCache.set(titleSlug, formattedProblem);
    
    return formattedProblem;

  } catch (error) {
    console.error(`Error fetching problem ${titleSlug}:`, error.message);
    
    // Return fallback data if fetch fails
    return getFallbackProblemData(titleSlug);
  }
};

/**
 * Format raw LeetCode problem data
 */
const formatProblemData = (problem) => {
  // Parse HTML content to extract examples and description
  const content = problem.content || '';
  const { description, examples, constraints } = parseContent(content);

  // Get code templates for different languages
  const codeTemplates = {};
  if (problem.codeSnippets) {
    problem.codeSnippets.forEach(snippet => {
      const langMap = {
        'python3': 'python',
        'cpp': 'cpp',
        'java': 'java',
        'javascript': 'javascript',
        'python': 'python',
        'c': 'c'
      };
      
      const mappedLang = langMap[snippet.langSlug];
      if (mappedLang) {
        codeTemplates[mappedLang] = snippet.code;
      }
    });
  }

  return {
    id: problem.questionFrontendId,
    title: problem.title,
    titleSlug: problem.titleSlug,
    difficulty: problem.difficulty,
    description,
    examples,
    constraints,
    hints: problem.hints || [],
    topics: problem.topicTags?.map(tag => tag.name) || [],
    codeTemplates,
    likes: problem.likes,
    dislikes: problem.dislikes,
    testCase: problem.sampleTestCase
  };
};

/**
 * Parse HTML content to extract description, examples, and constraints
 */
const parseContent = (htmlContent) => {
  // Simple HTML parsing - you might want to use a proper HTML parser
  let description = htmlContent
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

  // Extract examples (basic regex - might need refinement)
  const exampleRegex = /Example \d+:(.*?)(?=Example \d+:|Constraints:|$)/gs;
  const examples = [];
  let match;
  
  while ((match = exampleRegex.exec(description)) !== null) {
    const exampleText = match[1].trim();
    const inputMatch = exampleText.match(/Input:\s*(.+?)(?=Output:|$)/s);
    const outputMatch = exampleText.match(/Output:\s*(.+?)(?=Explanation:|$)/s);
    const explanationMatch = exampleText.match(/Explanation:\s*(.+?)$/s);
    
    if (inputMatch && outputMatch) {
      examples.push({
        input: inputMatch[1].trim(),
        output: outputMatch[1].trim(),
        explanation: explanationMatch ? explanationMatch[1].trim() : ''
      });
    }
  }

  // Extract constraints
  const constraintsMatch = description.match(/Constraints:(.*?)$/s);
  let constraints = [];
  if (constraintsMatch) {
    constraints = constraintsMatch[1]
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim());
  }

  // Clean description (remove examples and constraints sections)
  description = description
    .replace(/Example \d+:.*$/s, '')
    .replace(/Constraints:.*$/s, '')
    .trim();

  return { description, examples, constraints };
};

/**
 * Get fallback problem data when LeetCode fetch fails
 */
const getFallbackProblemData = (titleSlug) => {
  const defaultTemplates = {
    python: `def solution():
    # Write your code here
    pass`,
    cpp: `class Solution {
public:
    // Write your code here
};`,
    java: `class Solution {
    // Write your code here
}`,
    javascript: `var solution = function() {
    // Write your code here
};`
  };

  return {
    id: '1',
    title: titleSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    titleSlug,
    difficulty: 'Medium',
    description: 'Problem description could not be loaded. Please check the LeetCode link for full details.',
    examples: [],
    constraints: [],
    hints: [],
    topics: [],
    codeTemplates: defaultTemplates,
    likes: 0,
    dislikes: 0,
    testCase: ''
  };
};

/**
 * Convert problem title to LeetCode slug
 * @param {string} title - Problem title
 * @returns {string} Title slug
 */
export const titleToSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

/**
 * Batch fetch multiple problems
 * @param {Array<string>} titleSlugs - Array of problem slugs
 * @returns {Promise<Array<Object>>} Array of problem details
 */
export const fetchMultipleProblems = async (titleSlugs) => {
  const promises = titleSlugs.map(slug => fetchProblemDetails(slug));
  const results = await Promise.allSettled(promises);
  
  return results.map