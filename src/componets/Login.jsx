import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/fungio_domi.png";
import User from "./User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const bodyLogin = {
    email: email,
    password: password,
  };

  const [error, setError] = useState(false);

  const setLogin = () => {
    fetch("http://localhost:3001/security/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyLogin),
    })
      .then((res) => {
        if (res.ok) {
          setTimeout(() => {
            navigate("/home");
          }, 2000);

          return res.json();
        } else {
          setError(true);
          throw new Error("errore nel login");
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("accessToken", "Bearer " + data.token);
      });
  };

  const token = localStorage.getItem("accessToken");

  console.log(token);

  return (
    <Container className="log spa">
      <Row>
        <h3 className="titolo">
          <div>
            Login <img src={logo} alt="" width="75px" />
          </div>
        </h3>
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setLogin();
              <User />;
            }}
          >
            <Form.Group
              className="mb-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
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
            <Alert show={error} variant="danger">
              email o password errati.
            </Alert>
            <div className="bot">
              <Button variant="danger" type="submit" className="mb-3">
                Submit
              </Button>
            </div>
            <p className="bot">
              SE NON SEI ANCORA LOGGATO{" "}
              <Link to={"/register"} className="co">
                REGISTRATI
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
