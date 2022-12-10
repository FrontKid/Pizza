import { Routes, Route } from 'react-router-dom'

import GeneralLayout from './layouts/GeneralLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';


function App() {

  return (
    <Routes>
      <Route path='/' element={<GeneralLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path='pizza/:id' element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

