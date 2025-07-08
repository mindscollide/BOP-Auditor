import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoaderImage from "../../../assets/logo-hd.png";
import "./Loader.css";

const Loader = () => {
  const [isLoader, setIsLoading] = useState(false);

  const AuthLoader = useSelector((state) => state.authReducer.Loader);

  console.log(AuthLoader, "AuthLoaderAuthLoaderAuthLoader");
  const isLoading = [AuthLoader].some((loading) => loading);

  console.log(isLoading, "AuthLoaderAuthLoaderAuthLoader");

  useEffect(() => {
    let timeout;

    if (isLoading) {
      setIsLoading(true); // Show loader
    } else {
      // Hide loader after a short delay when loading completes
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    isLoader && (
      <div className="body-loader overflow-hidden">
        <div className="body-loader-inner">
          <div className="logo-loader-wrapper">
            <img
              className="img-fluid"
              src={LoaderImage}
              alt="Section-Loader"
              width={200}
            />
            <div className="loader-line-highlight" />
          </div>
        </div>
      </div>
    )
  );
};

export default Loader;
