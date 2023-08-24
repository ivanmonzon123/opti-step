import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBarComp from "./components/NavBarComp";
import HomePage from "./pages/HomePage"
import './App.css';
import FormPage from "./pages/FormPage";

function App() {
  return (
      <BrowserRouter>
        <article className="app-head-container">
          <NavBarComp/>
        </article>

        <article className="app-body-container">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/forms" element={<FormPage/>}/>
          </Routes>
        </article>
      </BrowserRouter>
  );
}

export default App;
