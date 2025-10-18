"use client";
import React from "react";
type Props = {
  description: string;
  policy?: string;
  sizeGuide?: string;
};
const DetailsTabs = ({ description, policy, sizeGuide }: Props) => {
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
        aria-label="Sizes"
      />
      <div className="tab-content text-gray-800 p-4 sm:p-6 text-sm sm:text-base shadow">
        {sizeGuide ? (
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: sizeGuide }}
          ></div>
        ) : (
          <p className="text-sm sm:text-base">No size guide available.</p>
        )}
      </div>

      <input
        type="radio"
        name="tabs_group"
        className="tab"
        aria-label="Terms & Conditions"
      />
      <div className="tab-content text-gray-800 p-4 sm:p-6 shadow">
        {policy ? (
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: policy }}
          ></div>
        ) : (
          <p className="text-sm sm:text-base">
            No terms and conditions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsTabs;
