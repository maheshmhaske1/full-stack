import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function PageNotFound() {
  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-md-12 text-center">
            <img
              src="https://cdn.dribbble.com/users/718859/screenshots/3267029/media/288dca6a18950d67040138304ba3837d.gif"
              alt=""
              className='img-fluid'
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFound;
