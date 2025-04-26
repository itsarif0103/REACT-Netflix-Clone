import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate  = useNavigate();

  const[playApiData, setPlayApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
})

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmQ3ZTY2YzJhZjc1ZjRiYzIxYjM3N2Y4YjZjNzRmNiIsIm5iZiI6MTc0NTY2Njg2Ny42Miwic3ViIjoiNjgwY2MzMzM1Y2VmZDE5ZDFjODU5NmYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1KPbVgr7P7hFuOc3aEIJ0Yr9MNPUu6rDfqG20ukgPAk'
    }
  };
  
  useEffect(() =>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setPlayApiData(res.results[0]))
    .catch(err => console.error(err));
    
  }, [])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() =>{navigate(-2)}} />
      <iframe width='90%' height= '90%' src={`https://www.youtube.com/embed/${playApiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{playApiData.published_at.slice(0,10)}</p>
        <p>{playApiData.name}</p>
        <p>{playApiData.type}</p>
      </div>
    </div>
  )
}

export default Player
