import PropTypes from "prop-types";

export default function Card({ poke }) {
  return (
    <div className="card">
      <span>temp card</span>
      <h1 className="pokeName">{poke.name}</h1>
    </div>
  );
}

Card.propTypes = {
  poke: PropTypes.object.isRequired,
};
