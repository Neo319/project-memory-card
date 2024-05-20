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
  const [message, setMessage] = useState("");
  const [messageLinger, setMessageLinger] = useState(false);

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

  useEffect(() => {
    if (messageLinger && isActive) {
      const container = document.getElementById("container");
      const message = document.getElementById("message");
      container.classList.remove("blurred");
      message.classList.remove("linger");

      setMessageLinger(false);
      setMessage("");
    }
  });

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
    setMessage("Shuffling...");
    showMessage();
  }

  function handleCardClick(poke) {
    console.log("guesses-", guesses.length);
    console.log("pokes-", pokes.length);
    if (!guesses.includes(poke.name)) {
      handleScoreIncrease();
      setGuesses([...guesses, poke.name]);
      setCurrentOrder(shuffler());

      // when all cards are guessed
      if (guesses.length === pokes.length - 1) {
        console.log("completed level");

        setMessage(
          <>
            <h2>Level complete!</h2>
            <span>Press the Start button to begin the next level.</span>
          </>
        );
        lingeringMessage();

        handleNextLevel();
        setGuesses([]);
      } else {
        //correct guess with >0 left
        const remaining = pokes.length - 1 - guesses.length;
        setMessage(
          <>
            <p>{poke.name}: correct!</p>
            <p>{remaining} left</p>
          </>
        );
        showMessage();
      }
    } else {
      setMessage("Sorry, wrong guess!");
      showMessage();

      setGuesses([]); //cleanup

      handleWrongGuess();
    }
  }

  //how the GUI gives instructions etc
  function showMessage() {
    console.log("message called");
    const container = document.getElementById("container");
    const message = document.getElementById("message");
    container.classList.add("blurred");

    message.classList.add("show");
    setTimeout(() => {
      message.classList.remove("show");
      container.classList.remove("blurred");
      setMessage("");
    }, 1700);
  }

  function lingeringMessage() {
    setMessageLinger(true);
    const container = document.getElementById("container");
    const message = document.getElementById("message");
    container.classList.add("blurred");

    message.classList.add("linger");
  }

  //loops over length of pokes array, making cards in currentOrder
  return (
    <>
      <button onClick={handleShuffleClick}>Shuffle!</button>
      <div id="messageContainer">
        <div className="message" id="message">
          {message}
        </div>

        <div className="lingeringMessage">
          {isActive ? <></> : <div className="message">{message}</div>}
        </div>

        <div className="container" id="container">
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
