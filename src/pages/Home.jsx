import { useEffect, useRef } from 'react';
import { v4 as getRandomKey } from 'uuid'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import Catigories from '../components/Content/Catigories';
import Sort, { popUpList } from '../components/Content/Sort';
import PizzaBlock from '../components/Content/PizzaBlock/PizzaBlock';
import Placeholder from '../components/Content/PizzaBlock/Placeholder';
import Pagination from '../components/Pagination/Pagination';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { pizzas, status } = useSelector(state => state.pizzaSlice)
  const { categoryId, sort, pageCount } = useSelector(state => state.filterReducer)
  const { searchValue } = useSelector(state => state.searchSlice)

  const getPizzas = async () => {
    dispatch(fetchPizzas({
      sort,
      pageCount,
      categoryId,
      searchValue
    }))
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
      getPizzas();
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

        {
          status === 'error' ? <div className='content__error-info'>
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению не удалось загрузить питсы =(
              Повторите попытку позже.
            </p>
          </div> : status === 'loading'
            ? [...new Array(10)].map(() => <Placeholder key={getRandomKey()} />)
            : pizzas
              .map((pizza) => <Link key={getRandomKey()} to={`pizza/${pizza.id}`}><PizzaBlock  {...pizza} /></Link>)
        }
      </div>
      {status === 'error' ? '' : <Pagination onChangePage={onChangePage} />}
    </div>
  )
}

export default Home