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
  const DESKTOP_SCRREN = 1500;
  const VIEWPORT_WIDTH = window.innerWidth;

  const handlePrintResultComp = useReactToPrint({
    content: () => resultCompRef.current,
  });

  const formVertions = {
    desktop: <DesktopFormPage handlePrintResultComp={handlePrintResultComp} />,
    default: <FormPage handlePrintResultComp={handlePrintResultComp} />,
  };

  const getFormToRenderByScreenSize = () => {
    if (VIEWPORT_WIDTH > DESKTOP_SCRREN) {
      return formVertions.desktop;
    }

    return formVertions.default;
  };

  return (
    <article ref={resultCompRef}>
      <BrowserRouter>
        <article className="app-head-container">
          <NavBarComp />
        </article>

        <article className="app-body-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forms" element={getFormToRenderByScreenSize()} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </article>
      </BrowserRouter>
    </article>
  );
}

export default App;
