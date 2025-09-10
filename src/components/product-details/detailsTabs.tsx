"use client";
import React from "react";
type Props = {
  description: string;
};
const DetailsTabs = ({ description }: Props) => {
  return (
    <div className="tabs tabs-lift mt-8 sm:mt-12">
      <input
        type="radio"
        name="tabs_group"
        className="tab"
        aria-label="Descriptions"
        defaultChecked
      />
      <div className="tab-content text-gray-800 p-4 sm:p-6 shadow">
        <h3 className="text-xl font-bold mb-4">Product Details</h3>
        {
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        }
      </div>

      <input
        type="radio"
        name="tabs_group"
        className="tab"
        aria-label="Terms & Conditions"
      />
      <div className="tab-content text-gray-800 p-4 sm:p-6 shadow">
        <p className="text-sm sm:text-base">
          Dear Customer, we try our best to provide you the best experience...
        </p>
      </div>

      <input
        type="radio"
        name="tabs_group"
        className="tab"
        aria-label="Sizes"
      />
      <div className="tab-content text-gray-800 p-4 sm:p-6 text-sm sm:text-base shadow">
        This is Size Section
      </div>
    </div>
  );
};

export default DetailsTabs;
