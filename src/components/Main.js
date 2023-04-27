import React, { useState } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';

import foods from '../models/foods';
import Food from './Food';

const Main = () => {
  let [nome, setNome] = useState('');

  const handleClick = (event) => {
    console.log('Clicou!');
  };

  const handleChange = (event) => {
    console.log('Digitou alguma coisa!');
  };

  return (
    <Container>
      <main>
        <h1>Menu</h1>
        {/* Component Button do bootstrap. */}
        <Form.Group className="mb-3">
          <Form.Label>Alimento</Form.Label>
          <Form.Control type="text" placeholder="Café" />

          <input type="text" onChange={handleChange} />
        </Form.Group>
        <Button onClick={handleClick} variant="primary">
          Pesquisar
        </Button>
        <Row className="my-2">
          {foods.map((food) => (
            <Food food={food}></Food>
          ))}
        </Row>
      </main>
    </Container>
  );
};

export default Main;
