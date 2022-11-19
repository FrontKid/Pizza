import { useState } from "react"
import { v4 as getRandomKey } from 'uuid'
const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

const Catigories = () => {

  const [categoryIndex, setCategoriIndex] = useState(0)

  const getIndex = (index: number): void => {
    setCategoriIndex(index)
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, i) => (
          <li
            key={getRandomKey()}
            onClick={_ => getIndex(i)}
            className={categoryIndex === i ? 'active' : ''}>{categorie}</li>
        ))}
      </ul>
    </div>
  )
}

export default Catigories