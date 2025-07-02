// import { getAuth } from "@clerk/clerk-react";

// import { getAuth } from "@clerk/clerk-react";

// export const markQuestionAsDone = async (questionId, sheetName) => {
//   const { getToken } = getAuth();
//   const token = await getToken();

//   const res = await fetch("http://localhost:3001/api/progress", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       questionId,
//       sheetName,
//       status: "solved",
//     }),
//   });

//   return await res.json();
// };


// export const getUserProgress=async(sheetName)=>{
//     const {getToken}=getAuth();
//     const token=getToken();

//     const res = await fetch(`http://localhost:3001/api/progress?sheetName=${sheetName}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//     const data = await res.json();
//     return data.progress;
// }

import { getAuth } from "@clerk/clerk-react";

export const markQuestionAsDone = async (questionId, sheetName) => {
  const token = await getAuth().getToken();  // <-- FIXED

  const res = await fetch("http://localhost:3001/api/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      questionId,
      sheetName,
      status: "solved",
    }),
  });

  return await res.json();
};

export const getUserProgress = async (sheetName) => {
  const token = await getAuth().getToken(); // <-- FIXED

  const res = await fetch(`http://localhost:3001/api/progress?sheetName=${sheetName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.progress;
};
