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
  const [description1, setDescription1] = useState({description1: ""});
  const [description2, setDescription2] = useState({description2: ""});

 
  const [pokemonName, setPokemonName] = useState('');

  // let pokemonInfo;


  const fetchPokemon = (event) => {
    setDescription2("");
    setDescription1("");
    event.preventDefault(); // Prevent form submission from reloading the page
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
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
        // Handle any errors that occur during the first API request
        console.error('Error:', error);
      });
  };


  // useEffect(() => {
  //   fetchAbilities(); 
  // }, [pokemonInfo]);

  const fetchAbilities = () => {

    // Make API calls for ability1 and ability2
    const ability1Url = `https://pokeapi.co/api/v2/ability/${pokemonInfo.ability1}`;
    const ability2Url = `https://pokeapi.co/api/v2/ability/${pokemonInfo.ability2}`;

    // Make API call for ability1
    axios.get(ability1Url)
      .then((response) => {
        // Handle the response for ability1
        console.log('Ability1 Response:', response.data.effect_entries[1].effect);
        setDescription1({description1: response.data.effect_entries[1].effect});
      })
      .catch((error) => {
        // Handle errors for ability1
        console.error('Error fetching ability1:', error);
      });

    // Make API call for ability2
    axios.get(ability2Url)
      .then((response) => {
        // Handle the response for ability2
        console.log('Ability2 Response:', response.data.effect_entries[1].effect);
        setDescription2({description2: response.data.effect_entries[1].effect});

      })
      .catch((error) => {
        // Handle errors for ability2
        console.error('Error fetching ability2:', error);
      });
  };




  const handleInputChange = (event) => {
    // Update the state with the input value as it changes
    setPokemonName(event.target.value);
  };

  return (
    <div className="container">
      <div className='topDiv'>
        <div className='card'>
        {pokemonInfo && (
          <img className='image' src={pokemonInfo.image} alt="POKEMON" />

        )}
        <p>Ability One:{pokemonInfo.ability1}</p>
        <p>{description1.description1}</p>
        <p>Ability Two:{pokemonInfo.ability2}</p>
        <p>{description2.description2}</p>
        <button onClick={fetchAbilities}>Show details</button>

        <p>POKEMON:{pokemonName}</p>
        </div>
      </div>
      <div className="bottomDiv">
        <form className="formDiv" onSubmit={fetchPokemon}>
          <input
            name='pokemon'
            placeholder='Choose your Pokemon'
            value={pokemonName}
            onChange={handleInputChange}
          />
          <button>
            Choose!
          </button>
        </form>
      </div>
    </div >

  );
}




export default App;
