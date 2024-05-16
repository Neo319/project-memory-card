import Card from "./Card";
import PropTypes from "prop-types";

export default function GameContainer({ pokes }) {
  //generating random orders for cards
  function shuffler() {
    // randomly reorders
    // temp: hard coded
    return [1, 0, 2];
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
