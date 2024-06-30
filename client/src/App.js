import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Main} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
