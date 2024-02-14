import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Register = () => {
  return (
    <Container className="log">
      <Row>
        <h3>Register for new update</h3>
        <Col>
          <Form className="text-light">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Marco" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Rossi" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Ma46ro" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
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
