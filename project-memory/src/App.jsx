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
  const highestLevel = 5;

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

    console.log(output);

    return output;
  }

  useEffect(() => {
    if (isActive) {
      const startGame = async () => {
        const newPokes = await getAllPokemon(level + 1);
        setPokes(newPokes);
      };
      startGame();
    }
  }, [isActive, level]);

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

    return output;
  }

  // game driver functionality

  function handleStartClick() {
    if (level > highestLevel) {
      return null;
    }
    setIsActive((prevIsActive) => {
      if (!prevIsActive) {
        setScore(0);
        return true;
      }
      return prevIsActive;
    });
  }

  function handleScoreIncrease() {
    setScore(score + 1);
  }

  function handleWrongGuess() {
    setIsActive(false);
    setTimeout(() => {
      handleStartClick();
    }, 1500);
  }

  function handleNextLevel() {
    setLevel(level + 1);
    setIsActive(false);

    //ending the game:
    if (level > highestLevel) {
      const container = document.getElementById("container");
      container.classList.add("blurred");
    }
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
        level={level}
        highestLevel={highestLevel}
      />
    </>
  );
}

export default App;
