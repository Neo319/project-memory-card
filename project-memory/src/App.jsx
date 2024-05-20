import ScoreKeeper from "./Score";
import "./App.css";
import GameContainer from "./Game-container";

import { useState, useEffect } from "react";

function App() {
  const [pokes, setPokes] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const numberOfPokemon = 1025;

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
      const index = Math.floor(Math.random() * numberOfPokemon + 1);
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

  //making the real api call :

  // const [pokes, setPokes] = useState([]);
  // useEffect(() => {
  //   getAllPokemon(1)
  //     .then((pokes) => {
  //       console.log(pokes);
  //       setPokes(pokes); // Update the pokes state with the fetched data
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []); // Empty dependency array ensures useEffect runs only once

  function handleStartClick() {
    console.log(isActive);
    if (!isActive) {
      const newPokes = _mockGetPokes(level + 1);
      setPokes(newPokes);
      setScore(0);
      setIsActive(true);
    }
  }

  function _mockGetPokes(length) {
    const mock = [
      {
        name: "Ninetales",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",
      },
      {
        name: "Drowzee",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png",
      },
      {
        name: "Rhydon",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png",
      },
      {
        name: "Buneary",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/427.png",
      },
    ];

    const output = mock.slice(0, length);

    console.log(output);
    return output;
  }

  // game driver functionality

  function handleScoreIncrease() {
    setScore(score + 1);
  }

  function handleWrongGuess() {
    setIsActive(false);
    setTimeout(() => {
      handleStartClick();
    }, 2000);
  }

  function handleNextLevel() {
    console.log("next level is called");
    setLevel(level + 1);
    setIsActive(false);
  }

  return (
    <>
      <h1 className="title">Pokémon Memory Card Challenge</h1>
      <ScoreKeeper score={score} level={level} />
      <button className="start" onClick={handleStartClick}>
        Start
      </button>
      <GameContainer
        pokes={pokes}
        handleScoreIncrease={handleScoreIncrease}
        handleWrongGuess={handleWrongGuess}
        isActive={isActive}
        handleNextLevel={handleNextLevel}
      />
    </>
  );
}

export default App;
