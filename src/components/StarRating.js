import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const wholeStars = Math.floor(rating);
    const fraction = rating % 1;
    const emptyStars = 5 - wholeStars - (fraction > 0 ? 1 : 0);

    for (let i = 0; i < wholeStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={i}
          style={{ color: 'gold' }}
        />
      );
    }

    if (fraction > 0) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          key={wholeStars}
          style={{ color: 'gold' }}
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={wholeStars + i + 1}
          style={{ color: 'lightgrey' }}
        />
      );
    }

    return stars;
  };

  return (
    <div className="d-flex align-items-center">
      <div className="d-inline-block">{renderStars()}</div>
    </div>
  );
};




export default StarRating;
