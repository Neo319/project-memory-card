import PropTypes from "prop-types";

export default function ScoreKeeper({ score }) {
  //temp: will be states

  const highScore = 10;
  const level = 1;

  return (
    <div className="score">
      <span>
        Score: {score} <br />
        high Score: {highScore} <br />
        Level: {level}
      </span>
    </div>
  );
}

ScoreKeeper.propTypes = {
  score: PropTypes.number.isRequired,
};
