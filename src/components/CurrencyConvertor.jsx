import { useEffect } from "react";
import { useState } from "react";
import DisplayDropdown from "./DisplayDropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

// import React from 'react'
function CurrencyConvertor() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  //currency converting from
  const [fromCurrency, setFromCurrency] = useState("USD");
  //currency converting to
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );

  //Currencies:  http://api.frankfurter.app/currencies
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("http://api.frankfurter.app/currencies");
      const data = await res.json();
      // data is an object so we convert data to array using Object.keys
      console.log("Object keys: ", Object.keys(data));
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error fetching currencies: ", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);
  console.log(currencies);

  //Conversion:  https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setConverting(false);
    }
  };


  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav != currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    console.log('favorites: ', favorites);
   };
  

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <DisplayDropdown
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        {/* swap currency button */}
        <div className="flex justify-center sm:mb-0 -mb-5">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <DisplayDropdown
          favorites={favorites}
          currencies={currencies}
          title="To:"
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorite={handleFavorite}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:{" "}
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="text-right mt-4 text-lg font-medium text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
}

export default CurrencyConvertor;
