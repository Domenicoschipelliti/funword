import { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import User from "./User";

const MyNavBar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/all/titolo?titolo=${searchQuery}`);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="black" data-bs-theme="dark">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="https://cdn.discordapp.com/attachments/1186353558132633643/1207040744255258654/fungio_domi.png?ex=65de334b&is=65cbbe4b&hm=0c7711d0185a669e15c2d04fbc71d8a6acb153d1926af22d19b40f218ea139dd&"
            alt="logo.png"
            className="image"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/chisono");
              }}
            >
              <i className="bi bi-question-circle ad">Chi sono</i>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/manga/add");
              }}
            >
              <i className="bi bi-plus-circle-fill ad">Add</i>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => {
                navigate("/login");
              }}
            >
              {/* <i className="bi bi-person-circle ad">Accedi</i> */}
              <p className="ad toglima">
                Benvenuto/a <User />
              </p>
            </Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Button type="submit" variant="outline-danger">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavBar;
