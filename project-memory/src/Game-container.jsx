import Card from "./Card";
import PropTypes from "prop-types";

import { useState, useEffect } from "react";

export default function GameContainer({
  pokes,
  handleScoreIncrease,
  handleWrongGuess,
  isActive,
  handleNextLevel,
}) {
  const [currentOrder, setCurrentOrder] = useState([0, 1]);
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    console.log("pokes was changed -- setting current order");

    //ensure currentOrder is the same length as pokes
    setCurrentOrder(shuffler());
  }, [pokes]);

  // Ensure currentOrder is always up-to-date with the length of pokes
  useEffect(() => {
    if (pokes.length !== currentOrder.length) {
      console.log("updating currentOrder");
      setCurrentOrder(shuffler());
    }
  }, [pokes.length, currentOrder.length]);

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

    console.log(output);

    return output;
  }

  function handleShuffleClick() {
    setCurrentOrder(shuffler());
  }

  function handleCardClick(poke) {
    console.log("guesses-", guesses.length);
    console.log("pokes-", pokes.length);
    if (!guesses.includes(poke.name)) {
      handleScoreIncrease();
      setGuesses([...guesses, poke.name]);
      setCurrentOrder(shuffler());

      // when all cards are guessed, start a new game
      if (guesses.length === pokes.length - 1) {
        console.log("completed level");
        handleNextLevel();
        setGuesses([]);
      }
    } else {
      console.log("wrong guess");
      setGuesses([]); //cleanup

      handleWrongGuess();
    }
  }

  //loops over length of pokes array, making cards in currentOrder
  return (
    <>
      <button onClick={handleShuffleClick}>Shuffle!</button>
      <div className="container">
        {pokes.map((poke, index) => {
          if (index >= currentOrder.length) return null;
          let orderedPoke = pokes[currentOrder[index]];
          return (
            <Card
              key={orderedPoke.name + "_" + index}
              poke={orderedPoke}
              onClick={() => handleCardClick(orderedPoke)}
              disabled={!isActive}
            />
          );
        })}
      </div>
    </>
  );
}

GameContainer.propTypes = {
  pokes: PropTypes.array.isRequired,
  handleScoreIncrease: PropTypes.func.isRequired,
  handleWrongGuess: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  handleNextLevel: PropTypes.func.isRequired,
};
