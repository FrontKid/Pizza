//react
import { useState } from 'react'
import { v4 as getRandomKey } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//slice
import { addItem } from '../../../redux/slices/cart/slice'

//selectors
import { selectCartItemById } from '../../../redux/slices/cart/selectors'

//types
import { TCartItem } from '../../../redux/slices/cart/types'

type TTypeSize = number[]
export type TPizza = {
  "id": string,
  "imageUrl": string,
  "title": string,
  "types": TTypeSize,
  "sizes": TTypeSize,
  "price": number,
  "category": number,
  "rating": number;
  'count'?: number;
}

const pizzaType: string[] = ['тонкое', 'традиционное']

const PizzaBlock: React.FC<TPizza> = ({ imageUrl, title, sizes, price, types, id }) => {



  const dispatch = useDispatch()
  const countCard = useSelector(selectCartItemById(id))

  const validCountCard = countCard ? countCard.count : 0

  const [activeSelect, setActiveSelect] = useState({
    pizzaTypeActive: 0,
    pizzaSizeActive: 0
  })
  const getType = (index: number): void => {
    setActiveSelect({
      ...activeSelect,
      pizzaTypeActive: index
    })
  }

  const addInCart = (): void => {
    const Item: TCartItem = {
      id,
      price,
      title,
      imageUrl,
      type: pizzaType[activeSelect.pizzaTypeActive],
      size: sizes[activeSelect.pizzaSizeActive],
      count: 0,
    }

    dispatch(addItem(Item))
  }
  const getSize = (index: number): void => {
    setActiveSelect({
      ...activeSelect,
      pizzaSizeActive: index
    })
  }

  return (
    <div className="pizza-block">
      <Link key={getRandomKey()} to={`pizza/${id}`}>
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeIndex, i) => (
            <li
              onClick={_ => getType(typeIndex)}
              className={activeSelect.pizzaTypeActive === i ? 'active' : ''}
              key={getRandomKey()}>{pizzaType[typeIndex]}</li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (

            <li
              onClick={_ => getSize(i)}
              className={activeSelect.pizzaSizeActive === i ? 'active' : ''}
              key={getRandomKey()}>{`${size} см`}</li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{`от ${price} грн`}</div>
        <button
          className="button button--outline button--add"
          onClick={addInCart}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {validCountCard > 0 && <i>{validCountCard}</i>}
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock