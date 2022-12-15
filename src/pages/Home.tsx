import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { v4 as getRandomKey } from 'uuid'
import qs from 'qs'

import Catigories from '../components/Content/Catigories';
import PizzaBlock from '../components/Content/PizzaBlock/PizzaBlock';
import Placeholder from '../components/Content/PizzaBlock/Placeholder';
import Pagination from '../components/Pagination/Pagination';
import Sort, { popUpList } from '../components/Content/Sort';

import { filterSliceSelector, setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectorPizzaSlice, TFetchPizza } from '../redux/slices/pizzaSlice';
import { selectorSerachSlice } from '../redux/slices/searchSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { pizzas, status } = useSelector(selectorPizzaSlice)
  const { categoryId, sort, pageCount } = useSelector(filterSliceSelector)
  const { searchValue } = useSelector(selectorSerachSlice)

  const getPizzas = useCallback(async () => {

    dispatch(fetchPizzas({
      sort,
      pageCount,
      categoryId,
      searchValue,
      sortProperty: ''
    }))
  }, [categoryId, dispatch, pageCount, searchValue, sort])

  useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as TFetchPizza

      const sort = popUpList.find(obj => obj.sort === params.sortProperty)

      if (sort) {
        params.sort = sort
      }
      dispatch(setFilters(params))
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false

  }, [categoryId, sort, searchValue, pageCount, dispatch, getPizzas])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sort,
        categoryId,
        pageCount,
      })

      navigate(`?${queryString}`)
    }
    if (!window.location.search) {
      dispatch(fetchPizzas({} as TFetchPizza))
    }
    isMounted.current = true
  }, [categoryId, sort, pageCount, navigate, getPizzas, dispatch])


  const onChangePage = (page: number): void => {
    dispatch(setPageCount(page))
  }

  return (
    <div className='container'>
      <div className="content__top">
        <Catigories categoryId={categoryId} onClickCategory={(id: number) => dispatch(setCategoryId(id))} />
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
              .map((pizza) => <PizzaBlock key={getRandomKey()}  {...pizza} />)
        }
      </div>
      {status === 'error' ? '' : <Pagination onChangePage={onChangePage} />}
    </div>
  )
}

export default Home