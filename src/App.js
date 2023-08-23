import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBarComp from "./components/NavBarComp";
import HomePage from "./pages/HomePage"
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <article className="app-head-container">
          <NavBarComp/>
        </article>

        <article className="app-body-container">
          <Routes>
            <Route path="/"
                   element={<HomePage/>}/>
          </Routes>
        </article>
      </BrowserRouter>
  );
}

export default App;
