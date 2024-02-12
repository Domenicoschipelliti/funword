import { useEffect, useState } from "react";
import { Col, Container, Figure, Row } from "react-bootstrap";

const Anime = () => {
  let [anime, SetAnime] = useState([]);

  const MyAnime = () => {
    fetch("http://localhost:3001/anime", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMmY1ZDVhNS04YWFmLTQ1ODgtYjljZC0xYzM4ZWEzODk3MjAiLCJpYXQiOjE3MDc1Njc0NTksImV4cCI6MTcwODE3MjI1OX0.tgXAzuys8_VEwrxkczWQtA9Hc0C7nvCAZ08n1qoYdMqiyyPMZusZkpzbUTqn4Fua",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nella get anime");
        }
      })
      .then((res) => {
        console.log("anime arrivati ", res);
        SetAnime(res);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  useEffect(() => {
    MyAnime();
  }, []);
  return (
    <Container>
      <Row>
        <h3 className="text-light">Anime</h3>
        <Col className="dis">
          {anime &&
            anime.map((animeList, i) => {
              return (
                <Figure className="figure" key={i}>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={animeList.immagine}
                  />
                  <Figure.Caption className="text-light">
                    {animeList.titolo}
                  </Figure.Caption>
                </Figure>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};
export default Anime;
