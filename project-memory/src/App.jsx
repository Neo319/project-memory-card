import ScoreKeeper from "./Score";
import "./App.css";
import GameContainer from "./Game-container";

function App() {
  //all data for pokemon is in 'pokes'. Will be replaced
  //with results of API calls
  const pokes = [
    {
      name: "Ninetales",
      sprite: null,
    },
    {
      name: "Drowzee",
      sprite: null,
    },
    {
      name: "Rhydon",
      sprite: null,
    },
  ];

  return (
    <>
      <h1 className="title">Pokémon Memory Card Challenge</h1>
      <ScoreKeeper />
      <GameContainer pokes={pokes} />
    </>
  );
}

export default App;
