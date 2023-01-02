//react
import { v4 as getRandomKey } from 'uuid'
import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from 'react-redux'


import { setSortType } from '../../redux/slices/filter/slice'
import { TSortFilter } from '../../redux/slices/filter/types'



export const popUpList: TSortFilter[] = [
  { name: 'популярности ↓', sort: 'rating' },
  { name: 'популярности ↑', sort: '-rating' },
  { name: 'цене ↓', sort: 'price' },
  { name: 'цене ↑', sort: '-price' },
  { name: 'алфавиту ↓', sort: 'title' },
  { name: 'алфавиту ↑', sort: '-title' },
]

type TPopUpSort = {
  sort: TSortFilter;
}

const Sort: React.FC<TPopUpSort> = React.memo(({ sort }) => {

  const dispatch = useDispatch()
  const [isVissible, setIsVissible] = useState(false)
  const sortArea = useRef<HTMLDivElement | null>(null)

  const clickedListItem = (obj: TSortFilter) => {
    dispatch(setSortType(obj))
    setIsVissible(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(sortArea.current)) {
        setIsVissible(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={sortArea}
      className="sort">
      <div className="sort__label">
        <svg
          className={isVissible ? 'sort__arrow--down' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVissible(!isVissible)}>{sort.name}</span>
      </div>
      {isVissible && (
        <div className="sort__popup">
          <ul>
            {popUpList.map((obj) => (
              <li
                key={getRandomKey()}
                onClick={() => clickedListItem(obj)}
                className={sort.sort === obj.sort ? 'active' : ''}
              >{obj.name}</li>
            ))}
          </ul>
        </div>)}
    </div>
  )
})

export default Sort