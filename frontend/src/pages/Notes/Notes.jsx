import React, { useEffect, useState } from 'react'

const Notes = () => {

  const [notesData,setNotesData]=useState([]);

    useEffect(() => {
      fetch('/NotesData.json')
        .then((res) => res.json())
        .then((data) => {
          setNotesData(data);
        })
        .catch((err) => {
          console.error(err);
          alert('Something went wrong while loading questions');
        });
    }, []);
  {!notesData &&  <div>Notes not found</div>}
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4 text-center">📚 Study Notes</h1>
       <p className="text-gray-800 font-semibold text-xl pl-8 mb-10 text-center">Your organized collection of learning resources</p>

      <div className="grid grid-cols-1 ml-10 mr-10  sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notesData.map((note, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]"
          >
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                <span>{note.emoji}</span> {note.topic}
              </h2>
              <p className="text-gray-600 text-sm">{note.description}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white dark:text-black px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
              >
                View
              </a>
              <a
                href={note.pdfUrl}
                download
                className="bg-gray-200 text-gray-800   dark:text-black px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes;
