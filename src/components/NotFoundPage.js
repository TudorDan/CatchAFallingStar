import React from "react";
import { Link } from "react-router-dom";
import { ImSad } from "react-icons/im";

function NotFoundPage() {
  return (
    <div className="bg-dark text-warning text-center display-1 mt-5">
      <h2>Page not Found</h2>
      <ImSad />
      <p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
