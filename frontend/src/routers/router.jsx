import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Dsa from "../pages/Dsa/Dsa";
import Notes from "../pages/Notes/Notes";
import TodoList from "../pages/Todo/TodoList";
import About from "../components/About";
import Top50 from "../pages/Dsa/Top50";
import Top75 from "../pages/Dsa/Top75";
import DsaTopic from "../pages/Dsa/dsaTopic/DsaTopic";
import Mockhub from "../pages/mockHub/Mockhub";
import AptitudeMockList from "../pages/mockHub/AptitudeMockList";
import HrMockList from "../pages/mockHub/HrMockList";
import CodingMockList from "../pages/mockHub/CodingMockList";
import CodingMock from "../pages/mockHub/CodingMock";
import AptitudeMock from "../pages/mockHub/AptitudeMock";
import Deshboard from "../pages/Deshboard";
import AskAIPage from "../pages/interview/AskAIPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/dsa",
                element: <Dsa />
            },
            {
                path: "/dsa/:topicId",
                element: <DsaTopic />
            }
            ,
            {
                path: "/notes",
                element: <Notes />
            },
            {
                path: "/todo",
                element: <TodoList />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/algo-top-questions",
                element: <Top50 />
            },
            {
                path: "/75-interview",
                element: <Top75 />
            },
            
            
            { path: "/mockhub", element: <Mockhub /> },
            { path: "/mockhub/coding", element: <CodingMockList /> },
            { path: "/mockhub/coding/:mockId", element: <CodingMock />
            },
            { path: "/mockhub/aptitude", element: <AptitudeMockList /> },
            { path: "/mockhub/aptitude/:aptId", element: <AptitudeMock />},
            { path: "/mockhub/hr", element: <HrMockList /> },
            {path:"/interview",element:<AskAIPage/>}
            //   { path: "/mockhub/hr/mock1", element: <HrMock /> }
        ]
    },
    {
        path:"/deshboard",
        element:<Deshboard/>
    },
])

export default router;