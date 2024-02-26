import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./componets/Home";
import MyNavBar from "./componets/MyNavBar";
import MyFooter from "./componets/MyFoteer";
import SearchBar from "./componets/SearchBar";
import ChiSiamo from "./componets/ChiSiamo";
import Login from "./componets/Login";
import Register from "./componets/Register";
import MangaMore from "./componets/MangaMore";
import AnimeMore from "./componets/AnimeMore";
import AnimeMod from "./componets/AnimeMod";
import MangaMod from "./componets/MangaMod";
import Post from "./componets/Post";
import Delete from "./componets/Delete";
import AnimeDelete from "./componets/AnimeDelete";
import Comment from "./componets/Comment";
import User from "./componets/User";
import AllSearch from "./componets/AllSearch";

function App() {
  return (
    <body className="App">
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/manga/add" element={<Post />} />
          <Route path="/anime/edit/:id" element={<AnimeMod />} />
          <Route path="/manga/edit/:id" element={<MangaMod />} />
          <Route path="/anime/:id" element={<AnimeMore />} />
          <Route path="/manga/:id" element={<MangaMore />} />
          <Route path="/" element={<Home />} />
          <Route path="/all/titolo" element={<AllSearch />} />
          <Route path="/chisono" element={<ChiSiamo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="manga/delete/:id" element={<Delete />} />
          <Route path="anime/delete/:id" element={<AnimeDelete />} />
        </Routes>

        <MyFooter />
      </BrowserRouter>
    </body>
  );
}

export default App;
