import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AnimeMod = () => {
  const [modifica, setModifica] = useState([]);
  const [titolo, setTitolo] = useState("");
  const [trama, setTrama] = useState("");
  const [voto, setVoto] = useState("");
  const [immagine, setImmagine] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const id = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyAnime = {
      titolo: titolo,
      trama: trama,
      voto: voto,
    };

    mod(bodyAnime);
  };
  const [error, setError] = useState(false);

  const mod = (bodyAnime) => {
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
        if (immagine) {
          uploadImage(res.id); // Passa l'id del manga al metodo uploadImage
        } else {
          setError(true);
          setUploaded(true);
        }
        console.log("setdopo ", res);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  const uploadImage = (animeId) => {
    const data = new FormData();
    data.append("image", immagine);

    fetch(`http://localhost:3001/manga/${animeId}/upload`, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Immagine caricata con successo!");
          setUploaded(true);
        } else {
          throw new Error("Errore durante il caricamento dell'immagine");
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };
  console.log("id ", id);
  console.log("idrisultato ", modifica);
  useEffect(() => {
    if (uploaded) {
      navigate("/");
    }
  }, [uploaded, navigate]);

  return (
    <Container>
      <Row>
        <Col>
          <Form className="text-light" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label> TITOLO:</Form.Label>
              <Form.Control
                type="text"
                value={titolo}
                onChange={(e) => {
                  setTitolo(e.target.value);
                }}
                placeholder="titolo"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>TRAMA:</Form.Label>
              <Form.Control
                type="text"
                value={trama}
                onChange={(e) => {
                  setTrama(e.target.value);
                }}
                placeholder="trama"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>VOTO:</Form.Label>
              <Form.Control
                type="text"
                value={voto}
                onChange={(e) => {
                  setVoto(e.target.value);
                }}
                placeholder="Voto da 1 a 10"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>IMMAGINE:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImmagine(e.target.files[0])}
              />
            </Form.Group>
            <Alert show={error} variant="danger">
              edit non autorizzata solo gli admin possono farla
            </Alert>
            <div className="di">
              <Button variant="warning" type="submit" className="mb-3">
                edit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AnimeMod;
