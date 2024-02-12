import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./componets/Home";
import MyNavBar from "./componets/MyNavBar";
import MyFooter from "./componets/MyFoteer";
import SearchBar from "./componets/SearchBar";

function App() {
  return (
    <body className="App">
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBar />} />
        </Routes>

        <MyFooter />
      </BrowserRouter>
    </body>
  );
}

export default App;
