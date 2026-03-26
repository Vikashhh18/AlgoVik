import React, { useEffect, useState } from 'react'

const Notes = () => {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/NotesData.json')
      .then((res) => res.json())
      .then((data) => {
        setNotesData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert('Something went wrong while loading notes');
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (notesData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">📭</span>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg font-medium">No notes found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Check back later or add some notes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          📚 Study Notes
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto">
          Your organized collection of learning resources
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium">
          <span>{notesData.length} resources available</span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notesData.map((note, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200/20 dark:border-gray-700/30 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Topic Header */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{note.emoji}</span>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug pt-0.5">
                  {note.topic}
                </h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {note.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                View
              </a>
              <a
                href={note.pdfUrl}
                download
                className="flex-1 text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;