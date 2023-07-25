import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function ClienteForm({showClienteForm, toggleClienteForm, setClientes}){
    
    const handleSubmitClienteForm = async (cliente)=> {
      
      await fetch('http://localhost:4000/clientes/', {
        method:'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: cliente.nome,
          email: cliente.email,
          nascimento: cliente.nascimento,
          cep: cliente.cep

        })}).then(res=>res.json()).then(data=> {
          }
        ).catch(err=>{});
        toggleClienteForm();
    } 
  
    const { Formik } = formik;
    const schema = yup.object().shape({
        nome: yup.string().matches(/^[aA-zZ\s]+$/, "Utilizar letras").required('Preencher campo').typeError('Escrever texto').min(2, 'Utilizar duas letras no mínimo'),
        email: yup.string().email().required('Preencher campo'),
        nascimento: yup.date().required('Preencher campo'),
        cep: yup.string().trim().matches(/^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/, 'CEP inválido').required('Preencher campo')
    })
    
    return(
        <>
        <Modal show={showClienteForm} onHide={toggleClienteForm}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">
              Adicionar Cliente
            </Modal.Title>
          </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmitClienteForm}
          initialValues={{
            nome: "",
            email: "",
            nascimento: "",
            cep: ""
          }}
          enableReinitialize = {true}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group controlId="formClienteNome">
                  <Form.Label>Nome:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={!!errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formClienteEmail">
                  <Form.Label>Email:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formClienteNascimento">
                  <Form.Label>Nascimento:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    name="nascimento"
                    value={values.nascimento}
                    onChange={handleChange}
                    isValid={touched.nascimento && !errors.nascimento}
                    isInvalid={!!errors.nascimento}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nascimento}
                  </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formClienteCep">
                  <Form.Label>Cep:</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="cep"
                    placeholder="00.000-000"
                    value={values.cep}
                    onChange={handleChange}
                    isValid={touched.cep && !errors.cep}
                    isInvalid={!!errors.cep}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cep}
                  </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleClienteForm}>
                      Close
                </Button>
                <Button type="submit">
                  Adicionar
                </Button>
              </Modal.Footer>
            </Form>)}
          </Formik>
        </Modal>
      </>
    )
}
