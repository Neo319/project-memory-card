import Card from "./Card";
import PropTypes from "prop-types";

import { useState } from "react";

export default function GameContainer({ pokes }) {
  const [currentOrder, setCurrentOrder] = useState([0, 1]);

  if (!pokes || pokes.length === 0) {
    return null;
  }

  //generating random orders for cards
  function shuffler() {
    const length = pokes.length;
    let output = [];

    while (output.length < length) {
      const current = Math.floor(Math.random() * length);

      if (!output.includes(current)) output.push(current);
    }

    return output;
  }

  function handleShuffleClick() {
    setCurrentOrder(shuffler());
  }

  //loops over length of pokes array, making cards in currentOrder

  return (
    <>
      <button onClick={handleShuffleClick}>Shuffle!</button>
      <div className="container">
        {pokes.map((poke, index) => {
          return <Card key={index} poke={pokes[currentOrder[index]]} />;
        })}
      </div>
    </>
  );
}

GameContainer.propTypes = {
  pokes: PropTypes.array.isRequired,
};
