import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
    image: "",
    ability1: "",
    ability2: "",
    ability3: "",
  });
  const [description1, setDescription1] = useState({ description1: "" });
  const [description2, setDescription2] = useState({ description2: "" });
  const [pokemonName, setPokemonName] = useState('');
  const [toggle, setToggle] = useState(true);
  console.log(toggle);


  // API call for pokemon by name. I'm using: name, sprites.front_default(image), and ability names (descriptions not included see below)
  const fetchPokemon = (event) => {
    setDescription2("");
    setDescription1("");
    event.preventDefault(); // Prevent form submission from reloading the page
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`)
      .then((response) => {
        // Handle the first API response data here
        console.log('API Response:', response.data);
        // Update the state with the first API response data
        setPokemonInfo({
          name: response.data.name,
          image: response.data.sprites.front_default,
          ability1: response.data.abilities[0].ability.name,
          ability2: response.data.abilities[1] ? response.data.abilities[1].ability.name : "", // Check if ability2 exists
          ability3: response.data.abilities[2] ? response.data.abilities[2].ability.name : "", // Check if ability3 exists
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // API call to ability endpoint since descriptions are not included in the above API call
  const fetchAbilities = () => {

    // Make API calls for ability1 and ability2
    const ability1Url = `https://pokeapi.co/api/v2/ability/${pokemonInfo.ability1}`;
    const ability2Url = `https://pokeapi.co/api/v2/ability/${pokemonInfo.ability2}`;

    // Make API call for ability1
    axios.get(ability1Url)
      .then((response) => {
        console.log('Ability1 Response:', response.data.effect_entries[1].effect);
        setDescription1({ description1: response.data.effect_entries[1].effect });
      })
      .catch((error) => {
        console.error('Error fetching ability1:', error);
      });

    axios.get(ability2Url)
      .then((response) => {
        console.log('Ability2 Response:', response.data.effect_entries[1].effect);
        setDescription2({ description2: response.data.effect_entries[1].effect });

      })
      .catch((error) => {
        console.error('Error fetching ability2:', error);
      });
  };


  const closeCard = () => {
    setPokemonInfo({
      name: "",
      image: "",
      ability1: "",
      ability2: "",
      ability3: "",
    })
    setPokemonName('')
  }

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };

  return (
    <div className="container">
      <p className='yourPokemon'>{pokemonInfo.name}</p>
      <div className='topDiv'>
        {pokemonInfo.name ? (
          <div className='card' onClick={() => { closeCard(); setToggle(true); }}>
            <img className='image' src={pokemonInfo.image} alt="POKEMON" />
            <p className='ability'>Ability One: <span className='abilityName'>{pokemonInfo.ability1}</span></p>
            <p className='desc'>{description1.description1}</p>
            <p className='ability'>Ability Two: <span className='abilityName'>{pokemonInfo.ability2}</span></p>
            <p className='desc'>{description2.description2}</p>
            {toggle ? (<button className="custom-button" onClick={(event) => { event.stopPropagation(); fetchAbilities(); setToggle(!toggle); }}>Show details</button>) : (<p></p>)}
          </div>
        ) : (
          <p>No info to display</p>
        )}
      </div>
      <div className="bottomDiv">
        <form className="formDiv" onSubmit={fetchPokemon}>
          <input
            className="custom-input"
            name='pokemon'
            placeholder='Choose your Pokemon'
            value={pokemonName}
            onChange={handleInputChange}
          />
          <button className="custom-button">
            Choose!
          </button>
        </form>
      </div>
    </div >

  );
}




export default App;
