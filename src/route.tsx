import { BrowserRouter, Routes ,Route} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

export  default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}