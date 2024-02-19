import { useEffect, useState } from "react";
import { Button, Col, Container, Figure, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const MangaMore = () => {
  const [result, setResult] = useState([]);

  const id = useParams();
  const navigate = useNavigate();
  const man = () => {
    fetch(`http://localhost:3001/manga/${id.id}`, {
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
  console.log("id ", id);
  console.log("idrisultato ", result);
  useEffect(() => {
    man();
  }, [id]);

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
                  <div className="blocco">
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
                  <Button
                    variant="warning"
                    type="submit"
                    className="mb-3"
                    onClick={() => {
                      navigate(`/manga/edit/${idmanga.id}`);
                    }}
                  >
                    edit
                  </Button>
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
