import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import imgBack from './images/back.bmp';
import imgNature from './images/Nature.bmp';
import imgNature2 from './images/Nature2.bmp';
import imgOilDrops from './images/OilDrops.bmp';
import imgShip from './images/Ship.bmp';
import imgSnowCat from './images/SnowCat.bmp';
import imgWhiteCat from './images/WhiteCat.bmp';

let initiaCards = [
  {id: 1, color: 'color1', state: 2},
  {id: 2, color: 'color1', state: 2},
  {id: 3, color: 'color2', state: 2},
  {id: 4, color: 'color2', state: 2},
  {id: 5, color: 'color3', state: 2},
  {id: 6, color: 'color3', state: 2},
  {id: 7, color: 'color4', state: 2},
  {id: 8, color: 'color4', state: 2},
  {id: 9, color: 'color5', state: 2},
  {id: 10, color: 'color5', state: 2},
  {id: 11, color: 'color6', state: 2},
  {id: 12, color: 'color6', state: 2},
];

function App() {
  const [cards, setCards] = useState(
    initiaCards
  );
  const [isShuffled, setShuffled] = useState(false);
  const [rerender, setRerender] = useState();
  const [clickCards, setClickCards] = useState(0);

  const getImage = (index) =>
  {
    switch(index) {
      case 'color1':
        return imgNature;
      case 'color2':
        return imgNature2;
      case 'color3':
        return imgOilDrops;
      case 'color4':
        return imgShip;
      case 'color5':
        return imgSnowCat;
      case 'color6':
        return imgWhiteCat;
      default:
        return imgBack;
    }
  }

  const generateLevel = (array) =>
  {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    }
    
    // Алгоритм Фишера-Йетса
    for (let i = 0; i < array.length; i++)
    {
      let ri = getRandomInt(i + 1);
      let tmp = array[ri];
      array[ri] = array[i];
      array[i] = tmp;
    }

    return array;
  }

  const handleClickButton = (event) => 
  {
    console.log("Start game!");
    let shuffleCards = [...cards];
    shuffleCards = generateLevel(shuffleCards);
    setCards(shuffleCards);
    setShuffled(true);
  } 

  const countFaceUpImage = () => {
    var count = 0;
    for (let card of cards) {
      if (card.state == 1)
        count += 1;
    }
    return count;
  }

  const cardFaceUp = () => {
    for (let card of cards) {
      if (card.state == 1)
        return card;
    }
    return null;
  }

  const isAllCardsDeleted = () => {
    for (let card of cards) {
      if (card.state != 0)
        return false;
    }
    return true;
  }

  const rotateCard = (card1, card2) => {
    card1.state = 2;
    card2.state = 2;
    setRerender(Symbol());
  };

  const deleteCards = (card1, card2) => {
    card1.state = 0;
    card2.state = 0;
    setRerender(Symbol());
  }
  
  const imageClick = (card) => {
    let countFaceUp = countFaceUpImage();
    let cardFacedUp = cardFaceUp();
    if (countFaceUp > 1)
      return;
    if (card.state == 2) { // картинкой вниз
      card.state = 1; // картинкой вверх
      setClickCards(clickCards + 1);
      setRerender(Symbol());
      
      if (countFaceUp == 1 && cardFacedUp != null) {
        if (cardFacedUp.color == card.color)
          setTimeout(deleteCards, 300, card, cardFacedUp);
        else 
          setTimeout(rotateCard, 400, card, cardFacedUp);
      }
    }
  } 
  
  const listItems = cards.map(card =>
    <li key={card.id}>
    {card.state == 0 
    ? <p/>
    : <img
        src={card.state == 2 ? imgBack : getImage(card.color)
        } height="100px" width="70px"
        onClick={() => imageClick(card)}
      />
    }
    </li>
  );

  return (
    <div className="App">
      <header className="App-header">
      {!isShuffled ? <button onClick={handleClickButton}>Start</button> : null}
      {isAllCardsDeleted() 
      ? <p>Количество кликов:{clickCards}</p> 
      : <ul className="App-cards">{isShuffled ? listItems : null}</ul>
      }
      </header>
    </div>
  );
}

export default App;
