import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import ffxivBg from './assets/Background.mp4'
const XIVAPI = require('@xivapi/js')

const xiv = new XIVAPI({
  private_key: '19fe4dd5d15649d997a711149e6baca587d6a6fe45434c1facec13446c2f0d09',
  language: 'en',
  snake_case: true
})




function App() {

  const [imageUrl, setImageUrl] = useState();
  const [imagePoro, setImagePoro] = useState([]);
 

  // Gets all info on whatever pokemon specified, I have this pointed to the image
  axios.get('https://pokeapi.co/api/v2/pokemon/clefairy/')
    .then((response) => {
      // Handle the API response data here
      console.log('API Response:', response.data.sprites.front_default);
      //! Change the response.data info from state to either a reducer or a varibale. State is not really appropriate for this
      console.log('Portrait Response:', response.data.sprites.front_default);

      const imageUrl = response.data.sprites.front_default;
      console.log('API Response:', imageUrl);

      // Update the state with the image URL
      setImageUrl(imageUrl);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error('Error on line 80:', error);
    });

  return (
    <div className="App">
      <div className="video-background">
        {/* <video autoPlay loop muted>
          <source src={ffxivBg} type="video/mp4" />
        </video> */}
        <header className="App-header">
          {/* Header content */}
        </header>
      </div>
      <div>
      <img className='card' src={imageUrl} alt="Poro" />
      </div>
    </div >

  );
}



export default App;
