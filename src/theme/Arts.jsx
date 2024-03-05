
import { GetArt } from '../services/Get'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {Avatar} from '@mui/material'
const Arts = () => {

  
  const [art, setArt] = useState([])

  useEffect(() => {
    const showArt = async () => {
      const response = await GetArt()
      console.log('this i sthe nhome function', response)
      setArt(response)
    }
    showArt()
  }, [])



const Art =()=>{
  return (
    <div>
      {art.map((art) => (
        <div className='post' key={art._id}>
          <Link to={`/user/${art.userId._id}`}>
            <div className="post__header">
            <div className="post__headerAuthor"> <Avatar/>{art.userId.name} </div>

           </div>
          </Link>
          <Link to={`/arts/${art._id}`}>
            <div className='post__image'>
            <img className="HomeArtImgs" src={art.img} alt={art.name} /></div>
          </Link>
        </div>
       
      ))}
    </div>
  )
      }
}
export default Arts