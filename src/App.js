import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarComp from "./components/NavBarComp";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./App.css";
import DesktopFormPage from "./desktop/pages/DesktopFormPage";

function App() {
  const resultCompRef = useRef();
  const viewportWidth = window.innerWidth;

  const handlePrintResultComp = useReactToPrint({
    content: () => resultCompRef.current,
  });

  return (
    <article ref={resultCompRef}>
      <BrowserRouter>
        <article className="app-head-container">
          <NavBarComp />
        </article>

        <article className="app-body-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/forms"
              element={
                viewportWidth < 1530 ? (
                  <FormPage handlePrintResultComp={handlePrintResultComp} />
                ) : (
                  <DesktopFormPage
                    handlePrintResultComp={handlePrintResultComp}
                  />
                )
              }
            />
          </Routes>
        </article>
      </BrowserRouter>
    </article>
  );
}

export default App;
