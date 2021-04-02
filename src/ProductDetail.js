import React, { useState, useEffect } from "react";
import { fetchProductDetail } from "./utils/api";
import ProductLoader from "./loader/ProductLoader";
import DefaultImg from './images/placeholder.png';
import "./css/ProductDetail.css";

function ProductDetail({ productId }) {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    if (!productId) return;
    fetchProductDetail(productId).then((productInfo) => {
      setProductInfo(productInfo);
      setLoding(false);
    }).catch(error => {
      console.log("Error in fetching product details for id "+productId+": ", error);
    });
  }, [productId]);

  function imageRenderError(e){
    e.target.src = DefaultImg
  }

  const renderProductInfo = () => {
    return (
      <div className="detail-container">
        {
          isLoading ? 
            <ProductLoader /> : 
            <React.Fragment>
              <div className="row">
                <img src={productInfo.image} className="product-image" alt={productInfo ? productInfo.title : "Product Image"} onError={(e) => imageRenderError(e)} />
              </div>
              <div className="row">
                <div className="row-title">Name:</div>
                <div className="row-body">{productInfo.title}</div>
              </div>
              <div className="row">
                <div className="row-title">Name:</div>
                <div className="row-body" title={productInfo ? productInfo.description : "Product Description"}>{productInfo.description}</div>
              </div>
              <div className="row">
                <div className="row-title">Price:</div>
                <div className="row-body">£{productInfo.price}</div>
              </div>
            </React.Fragment>
        }
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default ProductDetail;
