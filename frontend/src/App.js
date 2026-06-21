import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CookieConsent from "./Components/CookieConsent";
import BackToTop from "./Components/BackToTop";

const App = () => {
  useEffect(() => {
    if (sessionStorage.getItem("analyticsTracked")) return;

    const params = new URLSearchParams(window.location.search);
    const campaignId = params.get("social_analytics_id");

    if (campaignId) {
      sessionStorage.setItem(
        "analyticsSource",
        JSON.stringify({ type: "campaign", campaignId })
      );
      fetch(`/api/analytics/${campaignId}/click`, { method: "PUT" }).catch(
        () => {}
      );
    } else {
      sessionStorage.setItem(
        "analyticsSource",
        JSON.stringify({ type: "direct" })
      );
      fetch("/api/analytics/direct-visit", { method: "POST" }).catch(() => {});
    }

    sessionStorage.setItem("analyticsTracked", "true");
  }, []);

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
      <CookieConsent />
      <BackToTop />
    </>
  );
};

export default App;
