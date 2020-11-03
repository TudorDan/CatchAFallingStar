import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="bg-dark text-warning text-center">
      <h2>Page not Found</h2>
      <p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
