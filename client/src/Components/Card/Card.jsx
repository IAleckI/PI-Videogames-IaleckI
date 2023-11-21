import React from 'react'
import Style from './Card.module.css'
import imgNotFound from '../../imgs/notFound.jpg'
import { Link } from 'react-router-dom'

const Card = ( { id, name, image }) => {
  return (
    <div  className={Style.card}>
      <Link to={`/home/${id}`}>
        <img className={Style.img}  src={image} id={id} alt={name} onError={(e) => e.currentTarget.src = imgNotFound}/>
      </Link>
      <span>{name}</span>
      
    </div>
  )
}

export default Card