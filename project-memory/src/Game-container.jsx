import Card from "./Card";
import PropTypes from "prop-types";

export default function GameContainer({ pokes }) {
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

  //will be a state that is updated in certain conditions
  const currentOrder = shuffler(pokes);

  //loops over length of pokes array, making cards in currentOrder
  return (
    <div className="container">
      {pokes.map((poke, index) => {
        return <Card key={index} poke={pokes[currentOrder[index]]} />;
      })}
    </div>
  );
}

GameContainer.propTypes = {
  pokes: PropTypes.array.isRequired,
};
