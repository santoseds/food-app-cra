//Teste de atualização.
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
  let [food, setFood] = useState({ nome: '', imagem: '', descricao: '' });

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
    fetch('http://localhost:4000/comidas', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setFoods([...data]))
      .catch((error) => {});
  }, []);

  const handleChange = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(food);
  }, [food]);

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
          {/* <Form.Control
            type="text"
            placeholder="Café"
            onChange={handleChange}
            value={nome}
          /> */}
        </Form.Group>

        <Button onClick={handleClick} variant="primary">
          Pesquisar
        </Button>

        <Row className="my-2">
          {foods.map((food) => (
            <Food key={food.id} food={food}></Food>
          ))}
        </Row>
        {show}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Comida</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  name="nome"
                  onChange={handleChange}
                  value={food.nome}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Imagem</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Imagem"
                  name="imagem"
                  onChange={handleChange}
                  value={food.imagem}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
};

export default Main;
