import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const body = {
    nome: nome,
    cognome: cognome,
    username: username,
    email: email,
    password: password,
  };

  const registrazione = () => {
    fetch("http://localhost:3001/security/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          console.log("dati ", res);
          return res.json();
        } else {
          throw new Error("errore nella register");
        }
      })
      .then((data) => {
        console.log(data);
        alert("registrato correttamente!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="log">
      <Row>
        <h3>Register for new update</h3>
        <Col>
          <Form
            className="text-light"
            onSubmit={(e) => {
              e.preventDefault();
              registrazione();
            }}
          >
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setNome(e.target.value);
              }}
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="nome" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setCognome(e.target.value);
              }}
            >
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="Rossi" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Ma46ro" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="danger" type="submit" className="mb-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Register;
