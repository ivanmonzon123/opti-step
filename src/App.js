import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBarComp from "./components/NavBarComp";
import HomePage from "./pages/HomePage"
import './App.css';
import FormPage from "./pages/FormPage";
import {useRef} from "react";
import {useReactToPrint} from "react-to-print";

function App() {
  const resultCompRef = useRef();
  const handlePrintResultComp = useReactToPrint({
    content: () => resultCompRef.current
  });
  return (
    <article ref={resultCompRef}>
      <BrowserRouter>
        <article className="app-head-container">
          <NavBarComp/>
        </article>

        <article className="app-body-container">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/forms" element={<FormPage handlePrintResultComp={handlePrintResultComp}/>}/>
          </Routes>
        </article>
      </BrowserRouter>
    </article>
  );
}

export default App;
