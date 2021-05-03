import React, { useState, useEffect } from "react";

export const Footer = () => {
  //STATE
  const [quotes, setQuotes] = useState("");
  const token = "g0A9nm8lFL0bHebZHw5S";

  //FUNCTIONS

  const getQuote = () => {
    fetch("https://the-one-api.dev/v2/movie/5cd95395de30eff6ebccde5c/quote", {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          let randomNumber = Math.floor(Math.random() * data.docs.length);
          setQuotes(data.docs[randomNumber]);
        } else {
          setQuotes("");
        }
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <footer className="footer">
      <div className="quote-box">
        <p>{quotes.dialog}</p>
      </div>
      <button className="quote-button button" onClick={getQuote}>
        Generate quote
      </button>
    </footer>
  );
};
