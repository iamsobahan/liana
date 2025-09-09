import React from "react";

const DetailsTabs = () => {
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
        <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
          Weekend adventures call for black casual comfort that sacrifice style.
          These shoes from <span className="font-semibold">North Star</span> let
          you stay trendy and relaxed all day. Lightweight soles make casual
          styles for men easy to wear without compromising on fashion.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mb-3">Features</h3>
        <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-1 text-sm sm:text-base">
          <li>Type: Casual Shoes</li>
          <li>Gender: Men</li>
          <li>Color: Black</li>
          <li>Upper Material: Synthetic</li>
          <li>Sole: PVC</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mb-3">Style Tip</h3>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          Style up these cool casual shoes with a cotton t-shirt and ripped
          jeans for a trendy look.
        </p>
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
