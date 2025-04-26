import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import { Link } from 'react-router-dom'
import Cards_data from '../../assets/cards/Cards_data'

const TitleCard = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

const cardsRef = useRef();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmQ3ZTY2YzJhZjc1ZjRiYzIxYjM3N2Y4YjZjNzRmNiIsIm5iZiI6MTc0NTY2Njg2Ny42Miwic3ViIjoiNjgwY2MzMzM1Y2VmZDE5ZDFjODU5NmYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1KPbVgr7P7hFuOc3aEIJ0Yr9MNPUu6rDfqG20ukgPAk'
  }
};


const handleWheel =(event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() =>{
  fetch(`https://api.themoviedb.org/3/movie/${category ? category :"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handleWheel)
},[])
  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) =>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard
