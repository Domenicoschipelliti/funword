import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const MyNavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="lg" bg="black" data-bs-theme="dark">
      <Container>
        <Navbar.Brand
          href="#home"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#chisono"
              onClick={() => {
                navigate("/chisono");
              }}
            >
              Chi sono
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              href="#login"
              onClick={() => {
                navigate("/logim");
              }}
            >
              Accedi
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onSubmit={(e) => {
                e.preventDefault();
                e.target.value();
                navigate("/search");
                <SearchBar />;
              }}
            />
            <Button
              variant="outline-danger"
              onSubmit={(e) => {
                e.preventDefault();
                <SearchBar />;
              }}
              onClick={() => {
                navigate("/search");
              }}
            >
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavBar;
