import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';

//import foods from '../models/foods';
import Food from './Food';

const Main = () => {
  let [nome, setNome] = useState('');
  let [foods, setFoods] = useState([]);

  let buttonAdd = useRef(null);

  const handleClick = (event) => {};

  const handleChange = (event) => {
    setNome(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:4000/comidas', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setFoods([...data]))
      .catch((error) => {});
  }, []);

  return (
    <main>
      <Container>
        <h1>Menu</h1>
        <div className="text-right">
          <Button
            variant="secondary"
            className="rounded-circle mr-4 font-weight-bold"
            onClick={handleClick}
            ref={buttonAdd}
          >
            +
          </Button>
        </div>

        {/* Component Button do bootstrap. */}
        <Form.Group className="mb-3">
          <Form.Label>Alimento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Café"
            onChange={handleChange}
            value={nome}
          />
        </Form.Group>

        <Button onClick={handleClick} variant="primary">
          Pesquisar
        </Button>

        <Row className="my-2">
          {foods.map((food) => (
            <Food key={food.id} food={food}></Food>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default Main;
