import { useEffect, useState, useContext } from 'react';
import { v4 as getRandomKey } from 'uuid'

import { SearchContext } from '../App'
import Catigories from '../components/Content/Catigories';
import Sort from '../components/Content/Sort';
import PizzaBlock from '../components/Content/PizzaBlock/PizzaBlock';
import Placeholder from '../components/Content/PizzaBlock/Placeholder';
import Pagination from '../components/Pagination/Pagination';
const Home = () => {

  const { searchValue } = useContext(SearchContext)
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //sort
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  })
  //categories
  const [categoryId, setCategoryId] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {

    const order = sortType.sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sort.replace('-', '')
    setIsLoading(true)
    fetch(`https://637a06387419b414df9821a1.mockapi.io/items?page=${currentPage}&limit=4&${categoryId
      ? `category=${categoryId}`
      : ''}&sortBy=${sortBy}&order=${order}&${searchValue
        ? `search=${searchValue}`
        : ''}`)

      .then(response => response.json())
      .then(json => {
        setPizzas(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType.sort, searchValue, currentPage])

  return (
    <div className='container'>
      <div className="content__top">
        <Catigories categoryId={categoryId} onClickCategory={(id: number) => setCategoryId(id)} />
        <Sort sortType={sortType} onClickSort={(obj: any) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map(() => <Placeholder key={getRandomKey()} />)
          : pizzas
            .map((pizza: any) => <PizzaBlock key={getRandomKey()} {...pizza} />)
        }
      </div>
      <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
    </div>
  )
}

export default Home