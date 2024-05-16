import Card from "./Card";
import PropTypes from "prop-types";

export default function GameContainer({ pokes }) {
  //generating random orders for cards
  function shuffler() {
    // randomly reorders
    // temp: hard coded
    return [0, 1, 2];
  }

  //will be a state that is updated in certain conditions
  const currentOrder = shuffler(pokes);

  return (
    <div className="container">
      <Card poke={pokes[currentOrder[0]]} />
      <Card poke={pokes[currentOrder[1]]} />
      <Card poke={pokes[currentOrder[2]]} />
    </div>
  );
}

GameContainer.propTypes = {
  pokes: PropTypes.array.isRequired,
};
