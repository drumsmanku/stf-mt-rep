import React from "react";
import MiniMenuBtn from "./components/MiniMenuBtn.jsx";
import {Routes, Route, useLocation} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import FormBuilder from "./components/FormBuilder.jsx";
import About from "./Pages/About.jsx";
import Terms from "./Pages/Terms.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DesignSection from "./components/Form_Components/Form Sections/DesignSection.jsx";
import Pricing from "./Pages/Pricing.jsx";
import StoreViewer from "./Pages/StoreViewer.jsx";
import Base from "./components/Form_Components/LiveForm/Base.jsx";
import PaymentCancel from "./components/PaymentCancel.jsx";
import FormRenderer from "./components/FormRenderer.jsx";

function App() {
    const location = useLocation();
  return (
      <>
        <Routes>
            <Route path={"/"} element={<HomePage />}/>
            <Route path={"/home"} element={<HomePage />}/>
            <Route path={"/sign-up"} element={<Register />}/>
            <Route path={"/create-free-account"} element={<Register />}/>
            <Route path={"/log-in"} element={<Login />}/>
            <Route path={"/privacy"} element={<PrivacyPolicy />}/>
            <Route path={"/pricing"} element={<Pricing />}/>
            <Route path={"/about"} element={<About />}/>
            <Route path={"/terms"} element={<Terms />}/>
            <Route path={"/dashboard"} element={<Dashboard />}/>
            <Route path={"/form-builder/:formId"} element={<FormBuilder />}/>
            <Route path={"/striform/form/:formId"} element={<FormRenderer/>}/>
            <Route path={"/design"} element={<DesignSection />}/>
            <Route path={"/views"} element={<StoreViewer />}/>
            <Route path={"/live-form"} element={<Base />}/>
            <Route path={"/cancel"} element={<PaymentCancel />}/>
        </Routes>
          {
              !location.pathname.includes("striform/form") && <MiniMenuBtn />
          }
      </>
  );
}

export default App;
