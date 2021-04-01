import React, { useEffect, useState } from "react";
import { fetchSuggestions } from "./utils/api";
import "./css/Autocomplete.css";
import ProductDetail from "./ProductDetail";

function Autocomplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, selectProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState(-1);  

  useEffect(() => {
    /* We can also directly return blank if searchTerm.length === 0 */
    if(searchTerm.length > 0){
      setIsLoading(true);
      setSuggestions([]);
      
      const controller = new AbortController();
      const signal = controller.signal;

      let holdTimeout = setTimeout(function() {
        clearTimeout(holdTimeout);
        fetchSuggestions(searchTerm, signal).then((_suggestions) => {
          _suggestions.length > 0 && setSuggestions(_suggestions);
          setIsLoading(false);
        }).catch(error => {
          setIsLoading(false);
          console.log("Error in fetching search result: ", error);
        });
      }, 500);
      return () => {controller.abort()};
    }else if(selectedProduct === ""){
      document.querySelector('input.search-box').focus();
    }
  }, [searchTerm, selectedProduct]);

  function getProduct(productId) {
    clearData();
    productId && selectProduct(productId);
  }

  function clearData(){
    setSuggestions([]);
    setSearchTerm("");
  }

  function handleKeyDown(e) {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1)
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      setCursor(cursor + 1)
    }
    if(cursor > -1 && e.keyCode === 13 && document.querySelectorAll('.active.suggestion-title').length > 0){
      document.querySelector('.active.suggestion-title').click();
    }
  }

  function getSuggestions(e){
    setSearchTerm(e.target.value)
    setCursor(-1);
  }

  return (
    <React.Fragment>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          className="search-box"
          placeholder="Search for a product"
          onChange={(e) => getSuggestions(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {
          isLoading ? 
            <div className="loader">Loading...</div> :
            searchTerm.length > 0 &&
              <React.Fragment>
                <div className="clear-input" title="Clear Search Input" onClick={() => clearData()}>X</div>
                <div className="suggestion-list-wrapper">
                  {
                    suggestions.length > 0 ? 
                      suggestions.slice(0, 10).map((suggestion, index) => {
                        return <div key={suggestion.id} onClick={() => getProduct(suggestion.id)} className={cursor === index ? "active suggestion-title" : "suggestion-title" }>{suggestion.title}</div>
                      }) :
                      <div className="suggestion-title no-result">No Result Found</div>
                  }
                </div> 
              </React.Fragment>
        }
      </div>
      {
        selectedProduct !== "" && <ProductDetail productId={selectedProduct} />
      }
    </React.Fragment>
  );
}

export default Autocomplete;
