import ScoreKeeper from "./Score";
import "./App.css";
import GameContainer from "./Game-container";

function App() {
  // mock API call
  const pokes2 = [
    {
      name: "Ninetales",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",
    },
    {
      name: "Drowzee",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/462.png",
    },
    {
      name: "Rhydon",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",
    },
    {
      name: "Buneary",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",
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

    return neededData;
  }

  // generates an array at a desired length, of numbers corresponding to Pokemon (out of a total of 1025)
  function generatePokeNumbers(length) {
    let output = [];

    while (output.length < length) {
      const index = Math.floor(Math.random() * 1024 + 1);
      if (!output.includes(index)) {
        output.push(index);
      }
    }

    return output;
  }

  //master function that returns all pokemon data / "pokes"
  async function getAllPokemon(length) {
    const numbers = generatePokeNumbers(length);
    let output = [];

    const promises = numbers.map(async (number) => {
      return fetchPoke(number);
    });

    output = await Promise.all(promises);

    return output;
  }

  let pokes = [];

  //making the api call itself
  getAllPokemon(1)
    .then((pokes) => {
      console.log(pokes);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
      <h1 className="title">Pokémon Memory Card Challenge</h1>
      <ScoreKeeper />
      <GameContainer pokes={pokes} />
    </>
  );
}

export default App;
