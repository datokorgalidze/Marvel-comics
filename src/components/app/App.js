import {  Route, Routes } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleCharacterLayout from "../pages/singleCharacterLayout/SingleCharacterLayout";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SinglePage from "../pages/SinglePage";
import Page404 from "../pages/Page404";

const App = () => {
        return (
           <HashRouter>
             <div className="app">
                <AppHeader/>
                <main>
                   <Routes>
                      <Route path="/" element = {<MainPage/>}/>
                      <Route path="/comics" element = {<ComicsPage/>}/>
                      <Route path="/comics/:id" element = { <SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                      <Route path="/characters/:id" element = { <SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                      <Route path="*" element = {<Page404/>}/>
                   </Routes>  
                </main> 
             </div>
            </HashRouter>
        )  
}

export default App;