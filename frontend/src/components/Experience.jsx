import React, { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  // State Management
  const [interviewExperiences, setInterviewExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [showShareForm, setShowShareForm] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    jobRole: "",
    company: "",
    difficulty: "Medium",
    applyMethod: "Off-campus",
    interviewMode: "Online",
    numberOfRounds: "",
    questionsAsked: [""],
    advice: "",
    overallExperience: "",
  });

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // API Functions
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/expereince");
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setInterviewExperiences(data);
      setFilteredExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      setInterviewExperiences([]);
      setFilteredExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = interviewExperiences;

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.company?.toLowerCase().includes(search.toLowerCase()) ||
          item.jobRole?.toLowerCase().includes(search.toLowerCase()) ||
          item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }

    if (selectedCompany !== "All") {
      filtered = filtered.filter(item => item.company === selectedCompany);
    }

    setFilteredExperiences(filtered);
  }, [search, selectedDifficulty, selectedCompany, interviewExperiences]);

  // Form Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questionsAsked];
    newQuestions[index] = value;
    setFormData(prev => ({ ...prev, questionsAsked: newQuestions }));
  };

  const addQuestion = () => {
    setFormData(prev => ({ ...prev, questionsAsked: [...prev.questionsAsked, ''] }));
  };

  const removeQuestion = (index) => {
    if (formData.questionsAsked.length > 1) {
      const newQuestions = formData.questionsAsked.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, questionsAsked: newQuestions }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const filteredQuestions = formData.questionsAsked
      .filter(q => q.trim() !== '')
      .map(q => ({ question: q, type: "Technical" })); // 👈 FIXED

    const submissionData = {
      ...formData,
      questionsAsked: filteredQuestions,
      numberOfRounds: parseInt(formData.numberOfRounds),
    };

    console.log("hello");
    const res = await axios.post("http://localhost:3001/api/expereince/share-experience", submissionData);
    console.log("hello1", res.data);

    if (res.data.success) {
      alert("Experience added successfully! 🎉");
      setFormData({
        name: "", jobRole: "", company: "", difficulty: "Medium",
        applyMethod: "Off-campus", interviewMode: "Online", numberOfRounds: "",
        questionsAsked: [""], advice: "", overallExperience: "",
      });
      setShowShareForm(false);
      fetchExperiences();
    }
  } catch (error) {
    console.error("Error adding experience:", error);
    alert("Failed to add experience. Please try again.");
  }
};


  // Helper Functions
  const companiesList = ['All', ...new Set(interviewExperiences.map(exp => exp.company).filter(Boolean))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty) => {
    const baseStyles = "border px-3 py-1 rounded-full text-sm font-semibold";
    switch (difficulty?.toLowerCase()) {
      case 'easy': 
        return `${baseStyles} bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700`;
      case 'medium': 
        return `${baseStyles} bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700`;
      case 'hard': 
        return `${baseStyles} bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700`;
      default: 
        return `${baseStyles} bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600`;
    }
  };

  const getApplyMethodColor = (method) => {
    const baseStyles = "border px-3 py-1 rounded-full text-sm font-semibold";
    switch (method?.toLowerCase()) {
      case 'on-campus': 
        return `${baseStyles} bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700`;
      case 'off-campus': 
        return `${baseStyles} bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700`;
      case 'referral': 
        return `${baseStyles} bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700`;
      default: 
        return `${baseStyles} bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600`;
    }
  };

  const getQuestionsForDetailView = (experience) => {
    if (!experience.questionsAsked) return [];
    if (Array.isArray(experience.questionsAsked)) {
      return experience.questionsAsked.map((item, index) => ({
        text: typeof item === 'string' ? item : item.question || 'Question',
        type: typeof item === 'string' ? 'General' : item.type || 'General'
      }));
    }
    return [];
  };

  const getQuestionsCount = (experience) => {
    if (!experience.questionsAsked) return 0;
    return Array.isArray(experience.questionsAsked) ? experience.questionsAsked.length : 0;
  };

  const getQuestionsForDisplay = (experience) => {
    if (!experience.questionsAsked) return [];
    if (Array.isArray(experience.questionsAsked)) {
      return experience.questionsAsked.map(item => 
        typeof item === 'string' ? item : item.question || 'Question'
      );
    }
    return [];
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 md:p-8 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto"> 
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-black dark:bg-white bg-clip-text text-transparent mb-4">
            Interview Experiences
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn from real interview experiences shared by the community
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by company, role, or candidate name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowShareForm(true)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-3 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Share Experience
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Company:</span>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300"
              >
                {companiesList.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Difficulty:</span>
              <div className="flex gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Experience Cards Grid */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Community Experiences ({filteredExperiences.length})
          </h2>
          
          {filteredExperiences.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl text-gray-600 dark:text-gray-300 mb-4">No experiences found</h3>
              <p className="text-gray-400 dark:text-gray-500 mb-6">Try changing your search or filter criteria</p>
              <button
                onClick={() => setShowShareForm(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Be the first to share!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredExperiences.map((experience) => {
                const questions = getQuestionsForDisplay(experience);
                const questionsCount = getQuestionsCount(experience);
                
                return (
                  <div 
                    key={experience._id}
                    onClick={() => setSelectedExperience(experience)}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-400 transition-colors">
                          {experience.company}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{experience.jobRole}</p>
                      </div>
                      <span className={getDifficultyColor(experience.difficulty)}>
                        {experience.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-400">{experience.numberOfRounds}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">Rounds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{questionsCount}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold  text-purple-600 dark:text-purple-400">{experience.interviewMode}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">Mode</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2 text-sm">Sample Questions:</h4>
                      <div className="space-y-1">
                        {questions.slice(0, 2).map((question, idx) => (
                          <p key={idx} className="text-sm text-gray-400 dark:text-gray-500 line-clamp-2">• {question}</p>
                        ))}
                        {questionsCount > 2 && (
                          <p className="text-sm text-indigo-400">+{questionsCount - 2} more questions</p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{experience.overallExperience}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-sm text-gray-400 dark:text-gray-500">By {experience.name}</div>
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-lg font-semibold">
                        <span>View Details</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Share Experience Modal */}
      {showShareForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Share Your Interview Experience</h2>
              <button 
                onClick={() => setShowShareForm(false)} 
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Your Name *" 
                  required 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300" 
                />
                <input 
                  name="jobRole" 
                  value={formData.jobRole} 
                  onChange={handleInputChange} 
                  placeholder="Job Role *" 
                  required 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300" 
                />
                <input 
                  name="company" 
                  value={formData.company} 
                  onChange={handleInputChange} 
                  placeholder="Company *" 
                  required 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300" 
                />
                <select 
                  name="difficulty" 
                  value={formData.difficulty} 
                  onChange={handleInputChange} 
                  required 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <select 
                  name="applyMethod" 
                  value={formData.applyMethod} 
                  onChange={handleInputChange} 
                  required 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300"
                >
                  <option value="On-campus">On-campus</option>
                  <option value="Off-campus">Off-campus</option>
                  <option value="Referral">Referral</option>
                  <option value="Career Portal">Career Portal</option>
                </select>
                <select 
                  name="interviewMode" 
                  value={formData.interviewMode} 
                  onChange={handleInputChange} 
                  required 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300"
                >
                  <option value="Online">Online</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <input 
                  type="number" 
                  name="numberOfRounds" 
                  value={formData.numberOfRounds} 
                  onChange={handleInputChange} 
                  placeholder="Number of Rounds *" 
                  required 
                  min="1" 
                  max="10" 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Questions Asked *</label>
                <div className="space-y-3">
                  {formData.questionsAsked.map((question, index) => (
                    <div key={index} className="flex gap-3">
                      <input 
                        type="text" 
                        value={question} 
                        onChange={(e) => handleQuestionChange(index, e.target.value)} 
                        placeholder={`Question ${index + 1}`} 
                        required 
                        className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-300" 
                      />
                      {formData.questionsAsked.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeQuestion(index)} 
                          className="px-4 py-3 text-red-500 hover:text-red-400 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={addQuestion} 
                    className="px-4 py-3 text-indigo-500 hover:text-indigo-400 transition-colors rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center gap-2 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Another Question
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <textarea 
                  name="advice" 
                  value={formData.advice} 
                  onChange={handleInputChange} 
                  placeholder="Your Advice *" 
                  required 
                  rows="4" 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 resize-none transition-colors duration-300" 
                />
                <textarea 
                  name="overallExperience" 
                  value={formData.overallExperience} 
                  onChange={handleInputChange} 
                  placeholder="Overall Experience *" 
                  required 
                  rows="4" 
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 resize-none transition-colors duration-300" 
                />
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={() => setShowShareForm(false)} 
                  className="px-8 py-3 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 font-semibold"
                >
                  Share Experience 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Experience Details</h2>
              <button 
                onClick={() => setSelectedExperience(null)} 
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedExperience.company}</h1>
                  <p className="text-xl opacity-90">{selectedExperience.jobRole}</p>
                  <p className="opacity-80 mt-1">Shared by {selectedExperience.name}</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold bg-white   ${getDifficultyColor(selectedExperience.difficulty)}`}>
                    {selectedExperience.difficulty}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold bg-white  ${getApplyMethodColor(selectedExperience.applyMethod)}`}>
                    {selectedExperience.applyMethod}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Interview Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Rounds:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{selectedExperience.numberOfRounds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Apply Method:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{selectedExperience.applyMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Interview Mode:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{selectedExperience.interviewMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Difficulty:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{selectedExperience.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Questions Asked</h3>
                <div className="space-y-3">
                  {getQuestionsForDetailView(selectedExperience).map((q, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full text-sm flex items-center justify-center mt-0.5 font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{q.text}</p>
                        {q.type && q.type !== 'General' && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Type: {q.type}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Advice & Tips
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">{selectedExperience.advice}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Overall Experience
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">{selectedExperience.overallExperience}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;