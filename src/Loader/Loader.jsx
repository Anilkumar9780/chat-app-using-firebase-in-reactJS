import React from "react";

// package
import Loader from "react-spinner-loader";
import PropTypes from 'prop-types';

//style
import './loader.css';

export const Loaders = ({ loader }) => {
  return (
    <div className="spinner" >
      <Loader
        show={loader}
        type="body"
        stack="vertical"
        message="Loading...."
      />
    </div>
  );
}

Loaders.propTypes = {
  loader: PropTypes.bool
};