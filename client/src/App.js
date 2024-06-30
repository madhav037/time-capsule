import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main";
import PublicLetters from "./Pages/PublicLetters";
import WriteLetter from "./Pages/WriteLetter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/letters/new" Component={WriteLetter} />
        <Route path="/letters/public" Component={PublicLetters} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
