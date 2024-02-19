import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Figure, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const titolo = searchParams.get("titolo");
  const navigate = useNavigate();

  // const { titolo } = useParams();
  console.log("ciiiiiiiiiiiiiii", titolo);
  console.log(searchResults);
  const Ricerca = () => {
    fetch(`http://localhost:3001/anime/titolo?titolo=${titolo}`, {
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
          searchResults.map((animeList, index) => (
            <Col key={index} className="divisore">
              <Figure className="figure" style={{ display: "flex" }}>
                <div className="blocco">
                  <Figure.Image
                    width={171}
                    height={180}
                    value={searchResults}
                    alt={animeList.titolo || "Immagine"}
                    src={animeList.immagine}
                  />

                  <Figure.Caption className="text-light">
                    <h6> {animeList.titolo || "Nessun titolo"}</h6>
                    <div className="bot">
                      <Button
                        variant="warning"
                        type="submit"
                        className="mb-3"
                        onClick={() => {
                          navigate(`/anime/edit/${animeList.id}`);
                        }}
                      >
                        edit
                      </Button>
                    </div>
                  </Figure.Caption>
                </div>

                <div className="blocco2">
                  <Figure.Caption className="text-light">
                    <h4>Trama</h4>
                    {animeList.trama || "Nessuna trama"}.{""}
                    <h5 style={{ marginTop: "7px" }}>Voto</h5>
                    {animeList.voto || "Nessuna trama"}.
                  </Figure.Caption>
                </div>

                <Alert show={error} variant="danger">
                  Ricerca fallita.
                </Alert>
              </Figure>
            </Col>
          ))
        ) : (
          <Col className="divisore">
            <p className="text-light ">Nessun risultato trovato.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default SearchBar;
