import React from "react";
import {
    Routes,
    Route, BrowserRouter
} from "react-router-dom";
import ScrollToTop from "../components/utils/ScrollToTop";
import HomePage from "./HomePage";

export default function () {
   return (
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route exact path='/' element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        );
}