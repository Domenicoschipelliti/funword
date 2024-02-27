import { useEffect, useState } from "react";
import { Button, Col, Container, Figure, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";

const AnimeMore = () => {
  const [result, setResult] = useState([]);

  const id = useParams();
  const [del, setDel] = useState(false);

  const navigate = useNavigate();

  const man = () => {
    fetch(`http://localhost:3001/anime/${id.id}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
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
        setResult([res]);
        console.log("setdopo ", res);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };

  const animedelete = () => {
    fetch(`http://localhost:3001/anime/${id.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      "Content-Type": "application/json",
    })
      .then((res) => {
        if (res.ok) {
          console.log("id ", id);
          setDel(true);
        } else {
          throw new Error("errore nella delete anime");
        }
      })

      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  console.log("id ", id);
  console.log("idrisultato ", result);
  useEffect(() => {
    man();
  }, [id, del]);

  return (
    <Container>
      <Row>
        {result && result.length > 0 ? (
          result.map((idanime) => {
            return (
              <Col key={idanime.id}>
                <Figure
                  className="figure"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="blocco bi bi-bookmark-star">
                    <Figure.Image
                      width={171}
                      height={180}
                      alt={idanime.titolo || "Immagine"}
                      src={idanime.immagine}
                    />
                    <Figure.Caption className="text-light">
                      <h6>{idanime.titolo || "Nessun titolo"}</h6>
                    </Figure.Caption>
                  </div>
                  <div className="blocco2">
                    <Figure.Caption className="text-light">
                      <h4>Trama</h4>
                      {idanime.trama || "Nessuna trama"}.
                      <h5 style={{ marginTop: "7px" }}>Voto</h5>
                      {idanime.voto || "Nessun voto"}.
                    </Figure.Caption>
                  </div>
                </Figure>
                <div className="bot">
                  <Button
                    variant="warning"
                    type="submit"
                    className="mb-3 ma"
                    onClick={() => {
                      navigate(`/anime/edit/${idanime.id}`);
                    }}
                  >
                    edit
                  </Button>
                  <Button
                    variant="danger"
                    type="submit"
                    className="mb-3 ma"
                    onClick={() => {
                      animedelete();
                      setTimeout(() => {
                        navigate("/");
                      }, 500);
                    }}
                  >
                    delete
                  </Button>
                  <Comment />
                </div>
              </Col>
            );
          })
        ) : (
          <Col className="divisore">
            <p className="text-light">Nessun risultato trovato</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default AnimeMore;
