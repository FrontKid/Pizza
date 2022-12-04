import { useEffect, useState, useRef } from 'react';
import { v4 as getRandomKey } from 'uuid'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import Catigories from '../components/Content/Catigories';
import Sort, { popUpList } from '../components/Content/Sort';
import PizzaBlock from '../components/Content/PizzaBlock/PizzaBlock';
import Placeholder from '../components/Content/PizzaBlock/Placeholder';
import Pagination from '../components/Pagination/Pagination';
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { categoryId, sort, pageCount } = useSelector(state => state.filterReducer)
  const { searchValue } = useSelector(state => state.searchSlice)
  const fetchPizza = () => {
    const order = sort.sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sort.replace('-', '')
    setIsLoading(true)

    axios.get(`https://637a06387419b414df9821a1.mockapi.io/items?page=${pageCount}&limit=4&${categoryId
      ? `category=${categoryId}`
      : ''}&sortBy=${sortBy}&order=${order}&${searchValue
        ? `search=${searchValue}`
        : ''}`)
      .then(res => {
        setPizzas(res.data)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = popUpList.find(obj => obj.sort === params.sortProperty)
      dispatch(setFilters({
        ...params,
        sort
      }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false

  }, [categoryId, sort, searchValue, pageCount])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sort,
        categoryId,
        pageCount,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort, pageCount])


  const onChangePage = (number) => {
    dispatch(setPageCount(number))
  }

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
      <Pagination onChangePage={onChangePage} />
    </div>
  )
}

export default Home