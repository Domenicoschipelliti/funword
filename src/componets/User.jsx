import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const User = () => {
  const [utente, setUtente] = useState([]);

  const Subuser = () => {
    fetch(`http://localhost:3001/users/me`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("utente ", res);
          return res.json();
        }
      })
      .then((res) => {
        setUtente([res]);
      })
      .catch((err) => {
        throw new Error("errore nella get utente ", err);
      });
  };
  useEffect(() => {
    if (utente) {
      Subuser();
    }
  }, [utente]);

  return (
    <Container>
      <Row>
        {utente &&
          utente.map((ute, i) => {
            return (
              <Col className="ad" key={i}>
                {ute.nome || "Accedi"}
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};
export default User;
