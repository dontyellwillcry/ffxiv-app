import React, { useState, useEffect } from 'react';
import './App.css';
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({
  private_key: '3419471f8b0b44a4b43419980053b67ee01339430bed425a86260bf096f284e4',
  language: 'en',
  snake_case: true
})


function App() {

  const [imageUrl, setImageUrl] = useState([]);
  let myItem;
  let myFc;


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


      const getResponse = await xiv.freecompany.get(myFc, { data: 'FCM' });
      // console.log(getResponse.free_company_members);
      setImageUrl(getResponse.free_company_members);

    } catch (error) {
      console.error(error);
    }
  }
  console.log("Here is my FC", imageUrl)

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="App">
      <header className="App-header">

        {imageUrl.length > 0 ? (
          <p>{imageUrl[0].name}</p>
        ) : (
          <p>Loading...</p>

        )}
        {imageUrl.length > 0 ? (
          <img src={imageUrl[0].avatar}></img>
        ) : (
          <p>{null}</p>

        )}
      </header> 
    </div>
  );
}

export default App;
