import { useState } from "react"
import { v4 as getRandomKey } from 'uuid'
const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]

export type TCategories = {
  categoryId: number,
  onClickCategory: any
}

const Catigories = ({ categoryId, onClickCategory }: TCategories) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, i) => (
          <li
            key={getRandomKey()}
            onClick={_ => onClickCategory(i)}
            className={categoryId === i ? 'active' : ''}>{categorie}</li>
        ))}
      </ul>
    </div>
  )
}

export default Catigories