import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

type TPizza = {
  imageUrl: string,
  title: string,
  price: number,
}

const FullPizza: React.FC = () => {

  const [pizza, setPizza] = useState<TPizza | undefined>()
  const navigate = useNavigate()

  const { id } = useParams<string>()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get('https://637a06387419b414df9821a1.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Такой страницы нету =(')
        navigate('/')
      }

    }

    fetchPizza()
  }, [navigate, id])

  if (!pizza) {
    return <h1>'Загрузка...'</h1>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Totam eaque porro possimus voluptatum nisi, tempora laboriosam
        officiis quod culpa natus obcaecati maiores! Rerum saepe expedita
        deleniti consectetur, mollitia quasi laborum!
      </p>
      <h4>{pizza.price} грн</h4>
    </div>
  )
}

export default FullPizza