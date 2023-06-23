import { useEffect, useState } from 'react';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


interface CardProps{
  id: number;
  imgUrl: string;
  moveCard: (direction: string, id: number) => void;
}

const Card = ({id, imgUrl, moveCard}: CardProps ) => {
  return (
    <li className='cards_item'>
      <div className= 'card'>
        <div className='card_image'>
          <img src = {imgUrl} alt= "random" />
      </div>
      <div className='card_content'>
        <button className='left' onClick={() => moveCard("left", id)}><FontAwesomeIcon icon = {faArrowLeft}/></button>
        <button className='right' onClick={() => moveCard("right", id)}><FontAwesomeIcon icon = {faArrowRight}/></button>
      </div>
    </div>
    </li>
  )
}

interface CardData{
  id: number;
  imgUrl: string;
}

function App() {
  const [cards, setCards] = useState<Array<CardData>>([]);

  useEffect(()=>{
    const initialCards = Array.from({length: 10}, (_, idx)=>({
      id: idx,
      imgUrl: `https://picsum.photos/300/300?sig=${idx}`
    }))
    setCards(initialCards);
  }, []);

  const moveCard = (diection: string, id: number) => {

    let index = cards.findIndex(card => card.id === id);
    let newCards = [...cards];

    if(diection === "left" && index > 0){
      [newCards[index], newCards[index - 1]] = [newCards[index - 1], newCards[index]]
    }else if(diection === "right" && index < cards.length - 1){
      [newCards[index], newCards[index + 1]] = [newCards[index + 1], newCards[index]]
    }
    setCards(newCards);
  }

  return (
    <>
    <div>
      <h1>Xiling's Moodboard</h1>
    </div>
      <div className ='main'>
        <ul className='cards'>
          {cards.map(card => (
            <Card key={card.id} id={card.id} imgUrl={card.imgUrl} moveCard={moveCard} />
          ))}
        </ul>
      </div>
    </>
    
  )
}

export default App;
