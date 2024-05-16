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

  async function fetchPoke(dexNumber) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${dexNumber}`,
      {
        mode: "cors",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon");
    }

    const pokemonData = await response.json();

    const neededData = {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
      types: pokemonData.types,
    };

    console.log(neededData);

    return {
      neededData,
    };
  }

  let pokes2 = fetchPoke(4);

  return (
    <>
      <h1 className="title">Pokémon Memory Card Challenge</h1>
      <ScoreKeeper />
      <GameContainer pokes={pokes} />
    </>
  );
}

export default App;
