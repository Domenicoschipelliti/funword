import { useEffect, useState } from "react";
import { Button, Col, Container, Figure, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";

const MangaMore = () => {
  const [result, setResult] = useState([]);
  const [utente, setUtente] = useState([]);
  const [del, setDel] = useState(false);

  const id = useParams();
  const navigate = useNavigate();

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
        console.log("utente2 ", utente);
      })
      .catch((err) => {
        throw new Error("errore nella get utente ", err);
      });
  };
  useEffect(() => {
    Subuser();
  }, [localStorage.getItem("accessToken")]);

  const man = () => {
    fetch(`http://localhost:3001/manga/${id.id}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("ecco qua ", res);

          return res.json();
        } else {
          throw new Error("errore nella get manga");
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
  const mangadelete = () => {
    fetch(`http://localhost:3001/manga/${id.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      "Content-Type": "application/json",
    })
      .then((res) => {
        if (res.ok) {
          console.log(res, "eliminato");
          setDel(true);
        } else {
          throw new Error("Errore durante l'eliminazione");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, del]);

  return (
    <Container>
      <Row>
        {result && result.length > 0 ? (
          result.map((idmanga) => {
            return (
              <Col key={idmanga.id}>
                <Figure
                  className="figure"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="blocco bi bi-bookmark-star">
                    <Figure.Image
                      width={171}
                      height={180}
                      alt={idmanga.titolo || "Immagine"}
                      src={idmanga.immagine}
                    />
                    <Figure.Caption className="text-light">
                      <h6>{idmanga.titolo || "Nessun titolo"}</h6>
                    </Figure.Caption>
                  </div>
                  <div className="blocco2">
                    <Figure.Caption className="text-light">
                      <h4>Trama</h4>
                      {idmanga.trama || "Nessuna trama"}.
                      <h5 style={{ marginTop: "7px" }}>Voto</h5>
                      {idmanga.voto || "Nessun voto"}.
                    </Figure.Caption>
                  </div>
                </Figure>
                <div className="bot">
                  {utente &&
                    utente.map((user) => {
                      return (
                        user.role === "ADMIN" && (
                          <>
                            <Button
                              variant="warning"
                              type="submit"
                              className="mb-3 ma but"
                              onClick={() => {
                                navigate(`/manga/edit/${idmanga.id}`);
                              }}
                            >
                              <i class="bi bi-pencil-square">edit</i>
                            </Button>
                            <Button
                              variant="danger"
                              type="submit"
                              className="mb-3 ma button"
                              onClick={() => {
                                mangadelete();
                                setTimeout(() => {
                                  navigate("/");
                                }, 500);
                              }}
                            >
                              <i class="bi bi-trash3-fill">delete</i>
                            </Button>
                          </>
                        )
                      );
                    })}

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
export default MangaMore;
