import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const UtentiCommenti = ({ userId }) => {
  const [utente, setUtente] = useState([]);

  const Codiceunivoci = (codiceId) => {
    fetch(`http://localhost:3001/users/${codiceId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("utente_id ", res);
          return res.json();
        } else console.log("errore nella get");
      })
      .then((res) => {
        if (res.ok) {
          console.log("id ", userId);
          setUtente(utente.filter((ut) => ut.userId !== codiceId));
          console.log("utente ", codiceId);
        }
      })
      .catch((err) => {
        throw new Error("errore nella get id utente ", err);
      });
  };
  useEffect(() => {
    Codiceunivoci();
  }, [localStorage.getItem("accessToken")]);

  <Container>
    <Row>
      {utente &&
        utente.map((ute) => {
          return (
            <Col className="ad" key={ute.userId}>
              {ute.nome || "utente"}
            </Col>
          );
        })}
    </Row>
  </Container>;
};
export default UtentiCommenti;
