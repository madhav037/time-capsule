import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main";
import PublicLetters from "./Pages/PublicLetters";
import WriteLetter from "./Pages/WriteLetter";
import ViewLetter from "./Pages/ViewLetter";
import { DataProvider } from "./Utils/DataContext";
import ViewPublicLetter from "./Pages/ViewPublicLetter";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/letters/new" Component={WriteLetter} />
          <Route path="/letters/public" Component={PublicLetters} />
          <Route path="/letters/view" Component={ViewLetter} />
          <Route path="/public-letter" Component={ViewPublicLetter} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
