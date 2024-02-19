import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AnimeMod = () => {
  const [modifica, setModifica] = useState([]);
  const [titolo, setTitolo] = useState("");
  const [trama, setTrama] = useState("");
  const [voto, setVoto] = useState("");
  const id = useParams();
  const navigate = useNavigate();
  const bodyAnime = {
    titolo: titolo,
    trama: trama,
    voto: voto,
  };

  const mod = () => {
    fetch(`http://localhost:3001/anime/${id.id}`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyAnime),
    })
      .then((res) => {
        if (res.ok) {
          console.log("ecco qua ", res);
          console.log("id ", id);
          return res.json();
        } else {
          throw new Error("errore nella get anime");
        }
      })
      .then((res) => {
        console.log("ricerca completata ", res);
        setModifica([res]);
        console.log("setdopo ", res);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  console.log("id ", id);
  console.log("idrisultato ", modifica);
  useEffect(() => {
    mod();
  }, [id]);

  return (
    <Container className="">
      <Row>
        {modifica.map((animemod) => {
          return (
            <Col key={animemod.id}>
              <Form
                className="text-light"
                onSubmit={(e) => {
                  e.preventDefault();
                  mod();
                  navigate("/");
                }}
              >
                <Form.Group
                  className="mb-3"
                  onChange={(e) => {
                    setTitolo(e.target.value);
                  }}
                >
                  TITOLO:
                  <Form.Label>{animemod.titolo}</Form.Label>
                  <Form.Control type="text" placeholder={animemod.titolo} />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  onChange={(e) => {
                    setTrama(e.target.value);
                  }}
                >
                  TRAMA:
                  <Form.Label>{animemod.trama}</Form.Label>
                  <Form.Control type="text" placeholder={animemod.trama} />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  onChange={(e) => {
                    setVoto(e.target.value);
                  }}
                >
                  VOTO:
                  <Form.Label>{animemod.voto}</Form.Label>
                  <Form.Control type="text" placeholder={animemod.voto} />
                </Form.Group>
                <div className="di">
                  <Button variant="warning" type="submit" className="mb-3">
                    edit
                  </Button>
                </div>
              </Form>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default AnimeMod;
