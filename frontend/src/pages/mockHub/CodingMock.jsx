import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/getUrl";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

const CodingMock = () => {
     const { isSignedIn } = useUser();
     const { user } = useUser();
  const { getToken } = useAuth();
    const { mockId } = useParams();
    const [userAnswers, setUserAnswers] = useState({});
    const [mock, setMock] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        fetch("/MockCoding.json")
            .then((res) => res.json())
            .then((data) => setMock(data[mockId]))
            .catch((err) => {
                console.error(err);
                alert("Error loading mock data");
            });
    }, [mockId]);

    const handleSubmit = async () => {
        if (!isSignedIn) {
       toast.error("Please sign in to continue.");
  return;
    }

        if (!mock) return;

        const total = mock.mcqs.length;
        let correct = 0;

        mock.mcqs.forEach((q) => {
            if (userAnswers[q.id] === q.answer) {
                correct++;
            }
        });

        const result = {
            mockId,
            userId: user.id,
            total,
            correct,
            timestamp: new Date().toISOString()
        };

        try {
            const token = await getToken();
            await axios.post(`${baseUrl}/api/mock`, result, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`Test submitted! You answered ${correct} out of ${total} questions correctly.`);

            navigate("/mockhub/coding")
        } catch (err) {
            console.error("Error saving result:", err);
            alert("Something went wrong");
        }
    };


    if (!mock) return <p className="text-center mt-10">Loading {mockId}...</p>;

    return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-50 to-blue-50">
  <div className="max-w-3xl mx-auto">
    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">
        🧠 {mockId.replace("mock", "Mock Test ")} – Coding Round
      </h1>
      <p className="text-blue-600">Complete all sections to finish the test</p>
    </div>

    {/* MCQ Section */}
    <section className="mb-12 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <span className="text-blue-600 text-xl">🧪</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Multiple Choice Questions</h2>
      </div>
      
      <div className="space-y-4">
        {mock.mcqs.map((q, index) => (
          <div key={q.id} className="border border-gray-200 rounded-lg p-5 hover:shadow transition">
            <p className="font-medium text-gray-800 mb-3">
              Q{index + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                  <input
                    type="radio"
                    required
                    name={`q-${q.id}`}
                    value={opt}
                    onChange={() => setUserAnswers(prev => ({...prev, [q.id]: opt}))}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Coding Section */}
    <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <span className="text-blue-600 text-xl">💻</span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Coding Problems</h2>
      </div>
      
      <div className="space-y-4">
        {mock.coding.map((problem, i) => (
          <div key={problem.id} className="border border-gray-200 rounded-lg p-5 hover:shadow transition">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Q{i + 1}. {problem.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Solve on LeetCode
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
            
            <div className="mt-3 flex items-center">
              <input 
                type="checkbox" 
                id={`solved-${problem.id}`}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor={`solved-${problem.id}`} className="ml-2 text-sm text-gray-600">
                Mark as solved
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Submit Button */}
    <div className="text-center">
      <button 
        onClick={handleSubmit}
        className="cursor-pointer bg-gradient-to-r  from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
      >
        Submit Test
      </button>
    </div>
  </div>
</div>
    );
};

export default CodingMock;
