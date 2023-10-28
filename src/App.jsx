import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI({
  private_key: '3419471f8b0b44a4b43419980053b67ee01339430bed425a86260bf096f284e4',
  language: 'en',
  snake_case: true
})


function App() {

  const [imageUrl, setImageUrl] = useState('');
  let myItem;

xiv.search("Shroud Cherry Sapling").then((response) => {
  // do something with the response
   myItem = response.results[0].icon
   setImageUrl(myItem);
  console.log(response);
}).catch((error) => {
  // do something with the error
  console.log(error);
})

  return (
    <div className="App">
      <header className="App-header">

      <img src={imageUrl}></img>
      </header>
      
    </div>
  );
}

export default App;
