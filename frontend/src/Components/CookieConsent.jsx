import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#1a1a1a",
        color: "#fff",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.3)",
      }}
    >
      <p className="mb-0" style={{ flex: 1, minWidth: 240, fontSize: "0.9rem" }}>
        Folosim cookie-uri esențiale pentru autentificare și coș de cumpărături.
        Nu colectăm date de tracking terțe.{" "}
        <span style={{ color: "#adb5bd" }}>
          Continuând, ești de acord cu utilizarea acestora.
        </span>
      </p>
      <div className="d-flex gap-2">
        <Button variant="outline-light" size="sm" onClick={decline}>
          Refuz
        </Button>
        <Button variant="light" size="sm" onClick={accept}>
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
