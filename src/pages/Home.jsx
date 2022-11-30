import { useEffect, useState, useContext } from 'react';
import { v4 as getRandomKey } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setCategoryId } from '../redux/slices/filterSlice';
import { SearchContext } from '../App'
import Catigories from '../components/Content/Catigories';
import Sort from '../components/Content/Sort';
import PizzaBlock from '../components/Content/PizzaBlock/PizzaBlock';
import Placeholder from '../components/Content/PizzaBlock/Placeholder';
import Pagination from '../components/Pagination/Pagination';
const Home = () => {
  const dispatch = useDispatch()

  const { searchValue } = useContext(SearchContext)
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { categoryId, sort } = useSelector(state => state.filterReducer)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {

    const order = sort.sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sort.replace('-', '')
    setIsLoading(true)

    axios.get(`https://637a06387419b414df9821a1.mockapi.io/items?page=${currentPage}&limit=4&${categoryId
      ? `category=${categoryId}`
      : ''}&sortBy=${sortBy}&order=${order}&${searchValue
        ? `search=${searchValue}`
        : ''}`)
      .then(res => {
        setPizzas(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sort, searchValue, currentPage])

  return (
    <div className='container'>
      <div className="content__top">
        <Catigories categoryId={categoryId} onClickCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map(() => <Placeholder key={getRandomKey()} />)
          : pizzas
            .map((pizza) => <PizzaBlock key={getRandomKey()} {...pizza} />)
        }
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  )
}

export default Home