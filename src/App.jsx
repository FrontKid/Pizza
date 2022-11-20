import { useEffect, useState } from 'react';
import { v4 as getRandomKey } from 'uuid'
import Header from './components/Header/Header';
import Catigories from './components/Content/Catigories';
import Sort from './components/Content/Sort';
import PizzaBlock from './components/Content/PizzaBlock/PizzaBlock';
import Placeholder from './components/Content/PizzaBlock/Placeholder';
import './scss/app.scss';

function App() {

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://637a06387419b414df9821a1.mockapi.io/items')
      .then(response => response.json())
      .then(json => {
        setPizzas(json)
        setIsLoading(false)
      })
  }, [])
  const solution = n => !n ? [] : n.sort((a, b) => a - b)
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Catigories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(10)].map(() => <Placeholder key={getRandomKey()} />)
              : pizzas.map(pizza => <PizzaBlock key={getRandomKey()} {...pizza} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
