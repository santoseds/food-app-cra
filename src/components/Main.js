import React from 'react';
import foods from '../models/foods';
import Food from './Food';

import Button from 'react-bootstrap/Button';

class Pessoa {}

const Main = () => {
  let quantidade = 0;
  return (
    <main>
      <h1>Menu</h1>
      {/* Classe button adicionado no botão HTML. */}
      <button type="button" className="btn btn-primary">
        Cadastrar Raiz
      </button>

      {/* Component Button do bootstrap. */}
      <Button
        onClick={(event) => {
          console.log('Clicou: ' + quantidade++);
        }}
        variant="primary"
      >
        Cadastrar Nutela
      </Button>
      <section>
        <div>
          {foods.map((food) => (
            <Food food={food}></Food>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
