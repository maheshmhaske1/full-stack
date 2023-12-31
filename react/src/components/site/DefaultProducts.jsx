import React from "react";

function DefaultProducts() {
  const productData = [
    {
      id: 1,
      category: "Clothing",
      title: "Comfortable Sneakers",
      rating: 4.5,
      imageUrl:
        "https://www.highsnobiety.com/static-assets/dato/1699534637-most-comfortable-sneaker.jpg?fp-x=0.5&fp-y=0.5&fit=crop&auto=compress%2Cformat&cs=srgb&ar=1828%3A1219&w=1828&dpr=0.8",
      description: "Premium sneakers for maximum comfort.",
      price: 7999,
    },
    {
      id: 2,
      category: "Accessories",
      title: "Stylish Backpack",
      rating: 3.8,
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT3Xe4PSnUpLi2oq85XxPZfhddO7YPmawDufxg6midmYbxSB0GIsr75NjM804k",
      description: "A trendy and spacious backpack for your daily adventures.",
      price: 3499,
    },
    {
      id: 3,
      category: "Electronics",
      title: "Wireless Headphones",
      rating: 4.2,
      imageUrl:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQi8mPokUpJnHeFTIZHjcYa92VSQespcljlTEK5PEe2e2QgYFU7wGJmiE4B_w8",
      description: "Immerse yourself in music with these wireless headphones.",
      price: 5499,
    },
    {
      id: 4,
      category: "Electronics",
      title: "Smart Watch",
      rating: 4.7,
      imageUrl:
        "data:image/jpeg;base64,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",
      description:
        "Stay connected and track your fitness with this smartwatch.",
      price: 8999,
    },
    {
      id: 5,
      category: "Electronics",
      title: "Gaming Laptop",
      rating: 4.0,
      imageUrl:
        "data:image/jpeg;base64,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",
      description: "Powerful gaming laptop for an immersive gaming experience.",
      price: 129999,
    },
    {
      id: 6,
      category: "Electronics",
      title: "Digital Camera",
      rating: 4.6,
      imageUrl:
        "https://www.justcanon.in/cdn/shop/products/eos-1500d_06_500X700.jpg?v=1659021352",
      description:
        "Capture memorable moments with this high-quality digital camera.",
      price: 6999,
    },
    {
      id: 7,
      category: "Fitness",
      title: "Fitness Tracker",
      rating: 4.3,
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9TLuxccqIAuIINR68d9Ztbhd7SRUkTDgSJGiykQ4IIyjSEHNDovWCGleWDn7eyguz65MGk2JlySmtY3l3Yz9n7V6WVJ4o5eFh_uRvLVR13tixiXHZ6Yy5",
      description:
        "Monitor your health and fitness goals with this advanced tracker.",
      price: 2999,
    },
    // Add more products as needed
  ];

  return (
    <div>
      <>
        <div className="row justify-content-center">
          <div className="col-md-12 mt-4">
            <div className="card text-center">
              <div className="card-header">
                <h4 className="text-center">Top Products</h4>
              </div>
              <div className="card-body">
                <div className="row ">
                  {productData.map((product, i) => {
                    return (
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-2">
                        <div className="card text-center">
                          <div className="card-header">
                            <div className="row">
                              <div className="col-md-5">
                                <b className="">
                                  {product.rating} (
                                  <i class="bi bi-star-fill text-warning"></i>)
                                </b>
                              </div>
                              <div className="col-md">
                                <div className="vr"></div>
                              </div>
                              <div className="col-md-5">
                                <b>{product.category}</b>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <img
                              className="card-img-top rounded"
                              src={product.imageUrl}
                              alt="Card image cap"
                              style={{
                                height: "200px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <hr className="hr" />
                            <p className="card-text">{product.title}</p>
                          </div>
                          <div className="card-footer text-muted">
                            <div className="row">
                              <div className="col col-md-6 ">
                                <button
                                  className="btn btn-outline-danger "
                                  disabled
                                >
                                  <b>Rs.{product.price.toLocaleString()}</b>
                                </button>
                              </div>
                              <div className="col col-md-6">
                                <button className="btn btn-add-to-cart"
                                onClick={() => alert(product.id)}>
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default DefaultProducts;
