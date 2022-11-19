import { v4 as getRandomKey } from 'uuid'
import Header from './components/Header/Header';
import Catigories from './components/Content/Catigories';
import Sort from './components/Content/Sort';
import PizzaBlock from './components/Content/PizzaBlock';
import pizzas from './assets/pizzas.json'
import './scss/app.scss';
function App() {
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
            {pizzas.map(pizza => (
              <PizzaBlock key={getRandomKey()} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
