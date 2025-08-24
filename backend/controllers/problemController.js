// controllers/problemController.js
import axios from 'axios';

// LeetCode GraphQL endpoint
const LEETCODE_API = 'https://leetcode.com/graphql';

// Cache to store fetched problems (in production, use Redis or similar)
const problemCache = new Map();

/**
 * Convert problem title to LeetCode slug
 */
const titleToSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

/**
 * Parse HTML content to extract description, examples, and constraints
 */
const parseContent = (htmlContent) => {
  if (!htmlContent) return { description: '', examples: [], constraints: [] };

  let description = htmlContent
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();

  // Extract examples
  const exampleRegex = /Example \d+:(.*?)(?=Example \d+:|Constraints:|Note:|Follow-up:|$)/gs;
  const examples = [];
  let match;
  
  while ((match = exampleRegex.exec(description)) !== null) {
    const exampleText = match[1].trim();
    const inputMatch = exampleText.match(/Input:\s*(.+?)(?=Output:|$)/s);
    const outputMatch = exampleText.match(/Output:\s*(.+?)(?=Explanation:|Example|$)/s);
    const explanationMatch = exampleText.match(/Explanation:\s*(.+?)(?=Example|$)/s);
    
    if (inputMatch && outputMatch) {
      examples.push({
        input: inputMatch[1].trim(),
        output: outputMatch[1].trim(),
        explanation: explanationMatch ? explanationMatch[1].trim() : ''
      });
    }
  }

  // Extract constraints
  const constraintsMatch = description.match(/Constraints:(.*?)(?=Note:|Follow-up:|$)/s);
  let constraints = [];
  if (constraintsMatch) {
    constraints = constraintsMatch[1]
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(line => line.length > 0);
  }

  // Clean description (remove examples and constraints sections)
  description = description
    .replace(/Example \d+:.*$/s, '')
    .replace(/Constraints:.*$/s, '')
    .replace(/Note:.*$/s, '')
    .replace(/Follow-up:.*$/s, '')
    .trim();

  return { description, examples, constraints };
};

/**
 * Get default code templates
 */
const getDefaultCodeTemplates = () => ({
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
  javascript: `/**
 * @return {}
 */
var solution = function() {
    // Write your code here
};`
});

/**
 * Format raw LeetCode problem data
 */
const formatProblemData = (problem) => {
  const content = problem.content || '';
  const { description, examples, constraints } = parseContent(content);

  // Get code templates for different languages
  const codeTemplates = getDefaultCodeTemplates();
  if (problem.codeSnippets) {
    problem.codeSnippets.forEach(snippet => {
      const langMap = {
        'python3': 'python',
        'cpp': 'cpp',
        'java': 'java',
        'javascript': 'javascript',
        'python': 'python'
      };
      
      const mappedLang = langMap[snippet.langSlug];
      if (mappedLang && snippet.code) {
        codeTemplates[mappedLang] = snippet.code;
      }
    });
  }

  return {
    id: problem.questionFrontendId,
    title: problem.title,
    titleSlug: problem.titleSlug,
    difficulty: problem.difficulty,
    description: description || 'Problem description not available.',
    examples,
    constraints,
    hints: problem.hints || [],
    topics: problem.topicTags?.map(tag => tag.name) || [],
    codeTemplates,
    likes: problem.likes || 0,
    dislikes: problem.dislikes || 0,
    testCase: problem.sampleTestCase
  };
};

/**
 * Get fallback problem data when LeetCode fetch fails
 */
const getFallbackProblemData = (title) => {
  return {
    id: '1',
    title: title,
    titleSlug: titleToSlug(title),
    difficulty: 'Medium',
    description: 'Problem description could not be loaded from LeetCode. This might be due to network issues or the problem being unavailable. Please try again later or check the LeetCode link directly.',
    examples: [
      {
        input: 'Please check LeetCode for examples',
        output: 'Please check LeetCode for examples',
        explanation: 'Examples not available offline'
      }
    ],
    constraints: ['Please check the LeetCode link for constraints'],
    hints: [],
    topics: [],
    codeTemplates: getDefaultCodeTemplates(),
    likes: 0,
    dislikes: 0,
    testCase: ''
  };
};

/**
 * Fetch problem details from LeetCode API
 */
export const getProblemDetails = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Problem title is required'
      });
    }

    const titleSlug = titleToSlug(title);
    
    // Check cache first
    if (problemCache.has(titleSlug)) {
      return res.json({
        success: true,
        data: problemCache.get(titleSlug)
      });
    }

    // Fetch from LeetCode
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
          constraints
          codeSnippets {
            lang
            langSlug
            code
          }
          sampleTestCase
        }
      }
    `;

    const response = await axios.post(LEETCODE_API, {
      query,
      variables: { titleSlug }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; LeetCodeFetcher/1.0)',
        'Referer': 'https://leetcode.com'
      },
      timeout: 10000 // 10 second timeout
    });

    if (response.data.errors) {
      console.warn(`LeetCode API error for ${titleSlug}:`, response.data.errors[0].message);
      const fallbackData = getFallbackProblemData(title);
      return res.json({
        success: true,
        data: fallbackData,
        source: 'fallback'
      });
    }

    const problem = response.data.data.question;
    
    if (!problem) {
      const fallbackData = getFallbackProblemData(title);
      return res.json({
        success: true,
        data: fallbackData,
        source: 'fallback'
      });
    }

    // Format and cache the problem data
    const formattedProblem = formatProblemData(problem);
    problemCache.set(titleSlug, formattedProblem);
    
    res.json({
      success: true,
      data: formattedProblem,
      source: 'leetcode'
    });

  } catch (error) {
    console.error('Error fetching problem details:', error.message);
    
    // Return fallback data on any error
    const fallbackData = getFallbackProblemData(req.query.title || 'Unknown Problem');
    
    res.json({
      success: true,
      data: fallbackData,
      source: 'fallback',
      error: 'Could not fetch from LeetCode'
    });
  }
};