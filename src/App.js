import React, { useContext, useRef } from "react";
import Header from "./components/header";
import List from "./components/list";
import NotFound from "./components/notFound";
import Details from "./components/details";
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import './index.css'

console.log(2);
const App = ()=>{

    return (
        <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route exact path={'/'} element={<List/>} />
                <Route exact path={'/currency/:id'} element={<Details/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </div>
        </BrowserRouter>
    )
}

export default App