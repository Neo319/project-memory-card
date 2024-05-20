import PropTypes from "prop-types";

export default function ScoreKeeper({ score, level }) {
  //temp: will be states

  const highScore = 10;

  return (
    <div className="score">
      <span>
        Score: {score} <br />
        Highest possible Score: {highScore} <br />
        Level: {level}
      </span>
    </div>
  );
}

ScoreKeeper.propTypes = {
  score: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
};
