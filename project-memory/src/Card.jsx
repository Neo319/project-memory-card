import PropTypes from "prop-types";

export default function Card({ poke, onClick, disabled }) {
  return (
    <button className="card" onClick={onClick} disabled={disabled}>
      <span>temp card</span>
      <div className="pokeSprite">
        <img src={poke.sprite} alt="" />
      </div>
      <h1 className="pokeName">{poke.name}</h1>
    </button>
  );
}

Card.propTypes = {
  poke: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
