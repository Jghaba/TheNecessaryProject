import { Link } from "react-router-dom";

const NotFoundScreen = () => (
  <div className="text-center py-5">
    <h1 style={{ fontSize: "6rem", fontWeight: 700, letterSpacing: "-2px", color: "#111" }}>404</h1>
    <h2 className="mb-3">Page Not Found</h2>
    <p className="text-muted mb-4">The page you're looking for doesn't exist or has been moved.</p>
    <Link to="/" className="btn btn-dark px-4">
      Back to Shop
    </Link>
  </div>
);

export default NotFoundScreen;
