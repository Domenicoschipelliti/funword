import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Figure, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const SearchBarManga = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [utente, setUtente] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const titolo = searchParams.get("titolo");
  const navigate = useNavigate();

  // const { titolo } = useParams();
  console.log("ciiiiiiiiiiiiiii", titolo);
  console.log(searchResults);

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

  const Ricerca = () => {
    fetch(`http://localhost:3001/manga/titolo?titolo=${titolo}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("ecco qua ", res);
          console.log("titolo", titolo);
          return res.json();
        } else {
          setError(true);
          throw new Error("errore nella get anime");
        }
      })
      .then((data) => {
        console.log("ricerca completata ", data);
        setSearchResults(data);
        console.log("titolo", searchQuery);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  useEffect(() => {
    Ricerca();
  }, [titolo]);

  console.log("titolo ", titolo);
  const ricerca = searchResults;
  console.log(ricerca);
  if (!titolo) {
    return <div>Titolo non definito nell'URL.</div>;
  }
  return (
    <Container>
      <Row>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((mangaList, index) => (
            <Col key={index}>
              <Figure
                className="figure"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="blocco bi bi-bookmark-star">
                  <Figure.Image
                    width={171}
                    height={180}
                    value={searchResults}
                    alt={mangaList.titolo || "Immagine"}
                    src={mangaList.immagine}
                  />

                  <Figure.Caption className="text-light">
                    <h6> {mangaList.titolo || "Nessun titolo"}</h6>
                  </Figure.Caption>
                </div>

                <div className="blocco2">
                  <Figure.Caption className="text-light">
                    <h4>Trama</h4>
                    {mangaList.trama || "Nessuna trama"}.{""}
                    <h5 style={{ marginTop: "7px" }}>Voto</h5>
                    {mangaList.voto || "Nessuna trama"}.
                  </Figure.Caption>
                </div>

                <Alert show={error} variant="danger">
                  Ricerca fallita.
                </Alert>
              </Figure>
              <div className="bot">
                {utente &&
                  utente.map((ricercaManga) => {
                    return (
                      ricercaManga.role === "ADMIN" && (
                        <>
                          <Button
                            variant="warning"
                            type="submit"
                            className="mb-3 ma but"
                            onClick={() => {
                              navigate(`/anime/edit/${mangaList.id}`);
                            }}
                          >
                            <i class="bi bi-pencil-square">edit</i>
                          </Button>
                          <Button
                            variant="danger"
                            type="submit"
                            className="mb-3 ma button"
                            onClick={() => {
                              navigate(`/anime/delete/${mangaList.id}`);
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
          ))
        ) : (
          <Col className="divisore">
            <p className="text-light ">Nessun manga trovato.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default SearchBarManga;
