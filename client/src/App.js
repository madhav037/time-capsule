import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/main";
import PublicLetters from "./Pages/PublicLetters";
import WriteLetter from "./Pages/WriteLetter";
import ViewLetter from "./Pages/ViewLetter";
import { DataProvider } from "./Utils/DataContext";
import ViewPublicLetter from "./Pages/ViewPublicLetter";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

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
          <Route path="/signup" Component={SignUp} />
          <Route path="/login" Component={Login} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
