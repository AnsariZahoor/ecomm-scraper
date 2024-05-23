import React from "react";
import StarRating from "./StarRating";

export default function ResultsItem(props) {
  let {
    imageUrl,
    productName,
    productUrl,
    salesPrice,
    originalPrice,
    ratings,
    feedbacks,
    availability,
  } = props;
  return (
    <>
      <td className="align-middle product white-space-nowrap">
        <a
          className="d-block rounded-2 border border-translucent"
          href={imageUrl}
        >
          <img src={imageUrl} alt="" width="53" />
        </a>
      </td>
      <td className="align-middle product white-space-nowrap">
        <a className="fs-6 inter-400 text-decoration-none text-dark" href={productUrl}>
          {productName}
        </a>
        {!availability && (
            <p className="text-danger" style={{ fontSize: "13px" }}>
            Currently unavailable.
            </p>
        )}
      </td>

      <td className="align-middle text-center white-space-nowrap px-3">
        <p className="text-body" style={{ fontSize: "18px" }}>
          {salesPrice}
          <span
            className="ms-2 text-decoration-line-through"
            style={{ fontSize: "12px" }}
          >
            {originalPrice}
          </span>
        </p>
      </td>
      <td className="align-middle text-center white-space-nowrap">
        {/* <p className="mb-0">{ratings}</p> */}
        <StarRating rating={ratings} />
      </td>
      <td className="align-middle text-center">
        <p className="mb-0">{feedbacks}</p>
      </td>
    </>
  );
}
