/* eslint-disable react/prop-types */
// import React from 'react'
import { HiOutlineStar, HiStar } from "react-icons/hi2";
const DisplayDropdown = ({
  currency, // current currency highlighted
  currencies, // list of currencies
  setCurrency, // currency to set
  favorites, // list of favorite currencies
  handleFavorite, // handle favorite currency
  title = "", // to or from
}) => {
  const isFavorite = (curr) => favorites.includes(curr);
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-600"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {currencies?.map((currency) => {
            return (
              <option value={currency} key={currency} className="bg-gray-200">
                {currency}
              </option>
            );
          })}

          <hr />
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default DisplayDropdown;
