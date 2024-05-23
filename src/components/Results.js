import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultsItem from "./ResultsItem";
import AmazonLogo from "./assets/amazon.svg";
import FlipkartLogo from "./assets/flipkart.svg";

export default function Results(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [domain, setDomain] = useState(window.localStorage.getItem("domain") || "in");
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const source = props.source;

    try {
      // Destructure payload to get category and search_term
      const { search_term } = payload || {};

      // Make POST request to server
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/search`,{ source,search_term },
        { headers: {"X-API-KEY": process.env.REACT_APP_API_KEY }, 
      });

      let parsedData = await response.data;
      // Handle response data
      // console.log("Server response:", parsedData);
      setProducts(parsedData.results);

      // Store the results in localStorage
      localStorage.setItem(
        `search_results_${source}`,
        JSON.stringify({
          source,
          search_term,
          results: parsedData.results,
        })
      );

      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      // Handle error
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("An unknown error occurred during the POST request.");
      }
      setLoading(false);
    }
  };

  // Load the results from localStorage on initial load
  useEffect(() => {
    const storedResults = localStorage.getItem(
      `search_results_${props.source}`
    );
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setProducts(parsedResults.results);
    }
  }, [props.source]);

  const handleDownloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(products));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const productHeaders = Object.keys(products[0]);
    const csvHeaders = productHeaders.join(",") + "\n";
    csvContent += csvHeaders;
    products.forEach(function (product) {
      const productValues = productHeaders.map(function (header) {
        return product[header];
      });
      const csvRow = productValues.join(",") + "\n";
      csvContent += csvRow;
    });
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", encodeURI(csvContent));
    downloadAnchorNode.setAttribute("download", "data.csv");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // const toggleDomain = (newDomain) => {
  //   setDomain(newDomain);
  //   window.localStorage.setItem("domain", newDomain);
  //   window.location.reload(true);
  // };
  return (
    <>
      <main className="container pt-2">
        <form
          onSubmit={handleSearch}
          className="d-flex rounded shadow-sm w-75 m-auto my-3"
        >
          <input
            placeholder="What are you looking for?"
            type="text"
            name="search_term"
            className="ps-6 border-0 py-2 smooth-shadow-md form-control"
            required
          />
          <button type="submit" className="btn btn-dark ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </form>

        {error && <div className="alert alert-danger" role="alert">{error} try again later!</div>}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-dark fs-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : products && products.length > 0 ? (
          <div className="my-3 p-3 bg-body rounded shadow-sm">
            <div className="d-flex text-body-secondary">
              <div className="mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between mb-3">
                  <img
                    src={props.source === "amazon" ? AmazonLogo : FlipkartLogo}
                    width="8%"
                    height="auto"
                    alt="source-logo"
                  />
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary inter-400 btn-sm"
                      onClick={handleDownloadJson}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-download"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      &nbsp;JSON
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary inter-400 ms-2 btn-sm"
                      onClick={handleDownloadCsv}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-download"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      &nbsp;CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="table-responsive mx-n1 px-1 scrollbar">
              <table className="table fs-9 mb-0 table-borderless">
                <thead>
                  <tr>
                    <th className="" scope="col"></th>
                    <th className="" scope="col">
                      Product
                    </th>
                    <th className="text-center" scope="col">
                      Price
                    </th>
                    <th
                      className="text-center"
                      scope="col"
                      style={{ minWidth: "120px" }}
                    >
                      Ratings
                    </th>
                    <th className="text-center" scope="col">
                      Feedbacks
                    </th>
                  </tr>
                </thead>

                <tbody className="list" id="table-latest-review-body">
                  {products.map((element, index) => {
                    return (
                      <tr
                        className="hover-actions-trigger btn-reveal-trigger position-static my-2"
                        key={index}
                      >
                        <ResultsItem
                          productName={element.Name}
                          productUrl={element.ProductLink}
                          imageUrl={element.ImageLink}
                          salesPrice={element.SalesPrice}
                          originalPrice={element.OriginalPrice}
                          ratings={element.Ratings}
                          feedbacks={element.Feedback}
                          availability={element.Availability}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="my-5">
              Search on &nbsp;
              <img
                src={props.source === "amazon" ? AmazonLogo : FlipkartLogo}
                width="10%"
                height="auto"
                alt="source-logo"
              />
            </h3>
          </div>
        )}
      </main>
    </>
  );
}
