import { useEffect, useState } from "react";
import { Col, Container, Figure, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

// headers: {
//   Authorization:
//     "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMmY1ZDVhNS04YWFmLTQ1ODgtYjljZC0xYzM4ZWEzODk3MjAiLCJpYXQiOjE3MDc1Njc0NTksImV4cCI6MTcwODE3MjI1OX0.tgXAzuys8_VEwrxkczWQtA9Hc0C7nvCAZ08n1qoYdMqiyyPMZusZkpzbUTqn4Fua",
// },

const SearchBar = () => {
  let [search, setSearch] = useState(null);

  const [titolo, setTitolo] = useState("");
  console.log(titolo);
  const Ricerca = () => {
    fetch("http://localhost:3001/anime/titolo?titolo=" + titolo, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMmY1ZDVhNS04YWFmLTQ1ODgtYjljZC0xYzM4ZWEzODk3MjAiLCJpYXQiOjE3MDc1Njc0NTksImV4cCI6MTcwODE3MjI1OX0.tgXAzuys8_VEwrxkczWQtA9Hc0C7nvCAZ08n1qoYdMqiyyPMZusZkpzbUTqn4Fua",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("eccomi ", titolo);
          console.log(search);
          return res.json();
        } else {
          throw new Error("errore nella get anime");
        }
      })
      .then((res) => {
        console.log("ricerca completata ", res);
        setSearch(res);
        setTitolo("");
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  useEffect(() => {
    Ricerca();
  }, [titolo]);

  return (
    <Container>
      <Row>
        {search !== null &&
          search.map((ser, i) => {
            console.log(search);
            console.log(titolo);
            return (
              <Col key={i}>
                <Figure
                  className="figure"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setTitolo(e.target.value);
                  }}
                >
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={ser.immagine}
                  />
                  <Figure.Caption className="text-light">
                    {ser.titolo}
                  </Figure.Caption>
                </Figure>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};
export default SearchBar;
