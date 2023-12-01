import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import ffxivBg from './assets/Background.mp4'
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({
  private_key: '3419471f8b0b44a4b43419980053b67ee01339430bed425a86260bf096f284e4',
  language: 'en',
  snake_case: true
})




function App() {

  const [imageUrl, setImageUrl] = useState([]);
  const [imagePoro, setImagePoro] = useState([]);
  console.log("imageUrl:", imageUrl)
  console.log("imagePoro:", imagePoro)


  let myItem;
  let myFc;
  let myAvatar;


  // xiv.search("Shroud Cherry Sapling").then((response) => {
  //TODO    do something with the response
  //    myItem = response.results[0].name
  //     setImageUrl(myItem);
  //   console.log(response);
  // }).catch((error) => {
  //TODO   do something with the error
  // ?  console.log(error);
  // })

  // xiv.freecompany.search('Pixel Pirate Academy', {server: 'Zalera'}).then((response) => {
  //   myFc = response.results[0].id
  //   setImageUrl(myFc);
  // !  console.log(myFc);


  // }).catch((error) => {
  ////   console.log(error)
  // })

  // xiv.freecompany.get('9229142273877465895', {data: 'FCM'}).then((response) => {
  //    myFc = response.results[0].id
  //    setImageUrl(myFc);
  //   console.log(response);

  // }).catch((error) => {
  //   console.log(error)
  // })

  async function fetchData() {
    try {
      const searchResponse = await xiv.freecompany.search('Pixel Pirate Academy', { server: 'Zalera' });

      const myFc = searchResponse.results[0].id;
      // console.log("Here is the ID'S", searchResponse)


      const getResponse = await xiv.freecompany.get(myFc, { data: 'FCM' });
      //! Change the response.data info from state to either a reducer or a varibale. State is not really appropriate for this

      setImageUrl(getResponse.free_company_members);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  axios.get('https://xivapi.com/character/20542064')
    .then((response) => {
      // Handle the API response data here
      console.log('API Response:', response.data);
      //! Change the response.data info from state to either a reducer or a varibale. State is not really appropriate for this
      console.log('Portrait Response:', response.data.Character.Portrait);

      setImagePoro(response.data.Character.Portrait)
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });


  return (
    <div className="App">
      <>
      </>
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={ffxivBg} type="video/mp4" />
        </video>
        <header className="App-header">
          {/* Header content */}
        </header>
      </div>

      <div className="avatar-img">
        {imageUrl.length > 0 ? (
          <>
            <p>{imageUrl[2].name}</p>
            <img className='card' src={imagePoro} alt="Poro" />
            <div className="centered-container">
              <a href="https://www.fflogs.com/character/na/zalera/papa%20poro" target="_blank" rel="noopener noreferrer">
                My fflogs
              </a>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        
      </div>
    
    </div >
    
  );
}



export default App;
