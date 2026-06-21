import { FaCheck, FaTruck, FaCreditCard, FaClipboardList } from "react-icons/fa";

const STEPS = [
  { label: "Shipping", icon: <FaTruck size={14} /> },
  { label: "Payment", icon: <FaCreditCard size={14} /> },
  { label: "Place Order", icon: <FaClipboardList size={14} /> },
];

// step2=Shipping, step3=Payment, step4=PlaceOrder
const CheckoutSteps = ({ step2, step3, step4 }) => {
  const active = step4 ? 3 : step3 ? 2 : step2 ? 1 : 0;

  return (
    <div className="d-flex align-items-center justify-content-center mb-4" style={{ gap: 0 }}>
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const done = active > stepNum;
        const current = active === stepNum;
        const upcoming = active < stepNum;

        return (
          <div key={step.label} className="d-flex align-items-center" style={{ flex: i < STEPS.length - 1 ? 1 : "none" }}>
            <div className="d-flex flex-column align-items-center" style={{ minWidth: 64 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done ? "#198754" : current ? "#212529" : "#e9ecef",
                  color: done || current ? "#fff" : "#adb5bd",
                  fontWeight: 700,
                  fontSize: 13,
                  transition: "all 0.3s",
                  border: current ? "2px solid #212529" : "2px solid transparent",
                }}
              >
                {done ? <FaCheck size={13} /> : step.icon}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: current ? 700 : 500,
                  color: upcoming ? "#adb5bd" : "#212529",
                  marginTop: 4,
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </div>
            </div>

            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done ? "#198754" : "#e9ecef",
                  margin: "0 4px",
                  marginBottom: 20,
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
