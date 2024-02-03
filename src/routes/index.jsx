import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostPage } from "../pages/PostPage";
import { ErrorPage } from "../pages/ErrorPage";

export const RouteMain = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/post/:id" element={<PostPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    );
};