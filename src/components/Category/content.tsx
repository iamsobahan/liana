import React from "react";

export const FilterContent = () => {
  return (
    <>
      {/* Color */}
      <div className="mb-6 container mx-auto">
        <h3 className="font-medium mb-2">Color</h3>
        <div className="space-y-2 text-sm">
          {[
            "Lavender",
            "Slate Blue",
            "Bottle Green",
            "Yellow",
            "Burnt Orange",
            "Peanut",
            "Red",
            "Coffee",
          ].map((color) => (
            <label key={color} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <div className="space-y-2 text-sm">
          {[
            "100 to 300",
            "301 to 500",
            "501 to 1000",
            "1001 to 2500",
            "2501 to 5000",
            "5001 to 10000",
          ].map((price) => (
            <label key={price} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {price}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Size</h3>
        <div className="space-y-2 text-sm">
          {["Free Size", "90x30 Inch", "80x30 Inch"].map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2 text-sm">
          {[
            "Abaya & Gown",
            "Hijab & Niqab",
            "Khimar & Jilbab",
            "Cape & Cover Up",
            "Undergarments",
            "Accessories & Others",
          ].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-600" />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
