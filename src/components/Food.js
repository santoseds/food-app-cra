import React from 'react';

const Food = ({ food }) => {
  return (
    <div>
      <div className="card">
        <div className="card-header text-center font-weight-bold">
          <span>{food.name}</span>
        </div>
        <div className="card-body p-0">
          <img src={food.image} alt={food.name} className="w-100" />
        </div>
      </div>
    </div>
  );
};

export default Food;
