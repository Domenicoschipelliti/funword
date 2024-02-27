import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [titolo, setTitolo] = useState("");
  const [trama, setTrama] = useState("");
  const [voto, setVoto] = useState("");
  const [immagine, setImmagine] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyManga = {
      titolo: titolo,
      trama: trama,
      voto: voto,
    };

    PostManga(bodyManga);
  };
  const [error, setError] = useState(false);

  const PostManga = (bodyManga) => {
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
          console.log("Manga creato con successo!");
          return res.json();
        } else {
          setError(true);
          throw new Error("Errore nella creazione del manga");
        }
      })
      .then((res) => {
        console.log("Risultato:", res);
        if (immagine) {
          uploadImage(res.id); // Passa l'id del manga al metodo uploadImage
        } else {
          setUploaded(true);
        }
      })
      .catch((err) => {
        console.error("Errore:", err);
      });
  };

  const uploadImage = (mangaId) => {
    const data = new FormData();
    data.append("image", immagine);

    fetch(`http://localhost:3001/manga/${mangaId}/upload`, {
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
              <Form.Label>TITOLO:</Form.Label>
              <Form.Control
                type="text"
                value={titolo}
                onChange={(e) => setTitolo(e.target.value)}
                placeholder="Titolo"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>TRAMA:</Form.Label>
              <Form.Control
                type="text"
                value={trama}
                onChange={(e) => setTrama(e.target.value)}
                placeholder="Trama"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>VOTO:</Form.Label>
              <Form.Control
                type="text"
                value={voto}
                onChange={(e) => setVoto(e.target.value)}
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
              post non autorizzata solo gli admin possono farla
            </Alert>
            <div className="divisore">
              <Button variant="success" type="submit" className="mb-3">
                Aggiungi
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
