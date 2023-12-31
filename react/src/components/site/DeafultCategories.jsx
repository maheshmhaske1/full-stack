import React from "react";

function DeafultCategories() {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-12 mt-4">
          <div className="card text-center">
            <div className="card-header">
              <h4 className="text-center">Categories</h4>
            </div>
            <div className="card-body">
              <div className="row ">
                <div className="col-md-4 col-sm-6 mb-2">
                  <div className="card text-center shadow-lg rounded">
                    <div className="card-body">
                      <b id="cat-brand-name">Shoes</b>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-2">
                  <div className="card text-center shadow-lg  rounded">
                    <div className="card-body">
                      <b id="cat-brand-name">Sports</b>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-2">
                  <div className="card text-center shadow-lg  rounded">
                    <div className="card-body">
                      <b id="cat-brand-name">Clothing</b>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-2">
                  <div className="card text-center shadow-lg  rounded">
                    <div className="card-body">
                      <b id="cat-brand-name">Electronics</b>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-2">
                  <div className="card text-center shadow-lg  rounded">
                    <div className="card-body">
                      <b id="cat-brand-name">Mobiles</b>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-2">
                  <div className="card text-center shadow-lg  rounded">
                    <div className="card-body">
                      <b id="cat-brand-name">Medicine</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeafultCategories;
