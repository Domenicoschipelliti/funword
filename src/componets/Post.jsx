import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const [aggiungi, setAggiungi] = useState([]);
  const [titolo, setTitolo] = useState("");
  const [trama, setTrama] = useState("");
  const [voto, setVoto] = useState("");
  const id = useParams();
  const navigate = useNavigate();
  const bodyManga = {
    titolo: titolo,
    trama: trama,
    voto: voto,
  };

  const mod = () => {
    fetch(`http://localhost:3001/manga`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyManga),
    })
      .then((res) => {
        if (res.ok) {
          console.log("ecco qua ", res);
          console.log("id ", id);
          return res.json();
        } else {
          throw new Error("errore nella get manga");
        }
      })
      .then((res) => {
        console.log("ricerca completata ", res);
        setAggiungi([res]);
        console.log("setdopo ", res);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  console.log("id ", id);
  console.log("idrisultato ", aggiungi);
  useEffect(() => {
    mod();
  }, [id]);

  return (
    <Container>
      <Row>
        {aggiungi &&
          aggiungi.map((mangamod, i) => {
            return (
              <Col key={i}>
                <Form
                  className="text-light"
                  onSubmit={(e) => {
                    e.preventDefault();

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
                    <Form.Label>{mangamod.titolo}</Form.Label>
                    <Form.Control type="text" placeholder="titolo" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    onChange={(e) => {
                      setTrama(e.target.value);
                    }}
                  >
                    TRAMA:
                    <Form.Label>{mangamod.trama}</Form.Label>
                    <Form.Control type="text" placeholder="trama" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    onChange={(e) => {
                      setVoto(e.target.value);
                    }}
                  >
                    VOTO:
                    <Form.Label>{mangamod.voto}</Form.Label>
                    <Form.Control type="text" placeholder="voto da 1 a 10" />
                  </Form.Group>
                  <div className="di">
                    <Button
                      variant="success"
                      type="submit"
                      className="mb-3"
                      onSubmit={() => {
                        mod();
                      }}
                    >
                      add
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

export default Post;
