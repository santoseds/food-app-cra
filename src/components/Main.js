import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

//import foods from '../models/foods';
import Food from './Food';

const Main = () => {
  let [foods, setFoods] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // let [nome, setNome] = useState('');
  // let [imagem, setImagem] = useState('');
  let [food, setFood] = useState({ name: '', image: '' });

  let buttonAdd = useRef(null);

  async function getComidas() {
    const response = await fetch('http://localhost:4000/comidas', {
      method: 'GET',
    });
    const data = await response.json();

    return data;
  }

  const handleClick = async (event) => {
    console.log('Antes do fecth');
    const data = await getComidas();
    console.log(data);
    console.log('Depois do fetch!');
  };

  useEffect(() => {
    fetch('http://localhost:4000/foods')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoods([...data]);
      })
      .catch();
  }, []);

  const handleChange = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    // Enviar os dados para o servidor backend.
    console.log(food);
    fetch('http://localhost:4000/foods', {
      method: 'POST',
      body: JSON.stringify(food),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Atualizar a lista dos itens do cardápio.
  };

  return (
    <main>
      <Container>
        <h1>Menu</h1>
        <div className="text-right">
          <Button
            variant="secondary"
            className="rounded-circle mr-4 font-weight-bold"
            onClick={handleShow}
            ref={buttonAdd}
          >
            +
          </Button>
        </div>

        {/* Component Button do bootstrap. */}
        <Form.Group className="mb-3">
          <Form.Label>Alimento</Form.Label>
          <Form.Control type="text" placeholder="Café" />
        </Form.Group>

        <Button onClick={handleClick} variant="primary">
          Pesquisar
        </Button>

        <Row className="my-2">
          {foods.map((food) => (
            <Food key={food.id} food={food}></Food>
          ))}
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Comida</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleOnSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  name="name"
                  onChange={handleChange}
                  value={food.name}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Imagem</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Imagem"
                  name="image"
                  onChange={handleChange}
                  value={food.image}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </main>
  );
};

export default Main;
