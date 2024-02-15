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

function App() {
  return (
    <body className="App">
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/titolo" element={<SearchBar />} />
          <Route path="/chisono" element={<ChiSiamo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <MyFooter />
      </BrowserRouter>
    </body>
  );
}

export default App;
