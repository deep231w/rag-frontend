import { BrowserRouter, Routes ,Route, Navigate} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NewHome from "./pages/Home/NewHome";
import Dashboard from "./components/Dashboard";
import CreateBot from "./components/CreateBot";
import ManageBots from "./components/ManageBots";
import Settings from "./components/Settings";

const ProtectedRoute:React.FC<{children:React.ReactElement}>=({children})=>{
    const token= localStorage.getItem("token");

    if(!token){
        return <Navigate to={"/signin"}/>
    }

    return children;
}

export  default function AppRoutes(){
    const token= localStorage.getItem("token");

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"
                        element={token ? <Navigate to={"/home"}/>: <Navigate to={"/signin"}/>}
                />
                <Route path="/signup" element={token ? <Navigate to={"/home"}/>:<SignUp/>}/>
                <Route path="/signin" element={token ? <Navigate to={"/home"}/>:<SignIn/>}/>
                <Route path="/home/*" element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                }/>
               <Route
                path="/newhome"
                element={
                    <ProtectedRoute>
                    <NewHome />
                    </ProtectedRoute>
                }
                >
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="create-bot" element={<CreateBot/>} />
                <Route path="manage-bots" element={<ManageBots/>} />
                <Route path="settings" element={<Settings/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}