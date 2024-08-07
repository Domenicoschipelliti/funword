import { useEffect, useState } from "react";
import { Col, Container, Figure, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Anime = () => {
  let [anime, SetAnime] = useState([]);

  const MyAnime = () => {
    fetch("http://localhost:3001/anime", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
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
  // <i className="bi bi-bookmark-star-fill"></i>;
  return (
    <Container>
      <Row>
        <h3 className="text-light">Anime</h3>
        <Col className="dis dimension ">
          {anime &&
            anime.map((animeList, i) => {
              return (
                <Link key={i} to={`/anime/${animeList.id}`}>
                  <Figure className="figure">
                    <div>
                      <div className="d-flex">
                        <i className="bi bi-bookmark-star"></i>
                      </div>

                      <Figure.Image
                        width={173}
                        height={178}
                        alt="171x180"
                        className="fi"
                        src={
                          animeList.immagine || (
                            <Spinner animation="border" variant="danger" />
                          )
                        }
                      />
                    </div>

                    <Figure.Caption className="text-light ti ">
                      {animeList.titolo || (
                        <Spinner animation="border" variant="danger" />
                      )}
                    </Figure.Caption>
                  </Figure>
                </Link>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};
export default Anime;
