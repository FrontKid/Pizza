//react
import React from 'react'
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
  onClickCategory: (i: number) => void
}

export const Catigories: React.FC<TCategories> = React.memo(({ categoryId, onClickCategory }) => (
  <div className="categories">
    <ul>
      {categories.map((categorie, i) => (
        <li
          key={getRandomKey()}
          onClick={() => onClickCategory(i)}
          className={categoryId === i ? 'active' : ''}>{categorie}</li>
      ))}
    </ul>
  </div>
))
