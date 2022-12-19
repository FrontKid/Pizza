//react
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

//layouts
import GeneralLayout from './layouts/GeneralLayout';

//pages
import Home from './pages/Home';

import './scss/app.scss';

//dynamic pages
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'))
const FullPizza = React.lazy(() => import( /* webpackChunkName: "FullPizza" */'./pages/FullPizza'))

const App = () => (
  <Suspense fallback={<div>Идет загрузка...</div>}>
    <Routes>
      <Route path='/' element={<GeneralLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path='pizza/:id' element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
)

export default App;

