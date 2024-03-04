import { useEffect, useState } from "react";
import { Col, Container, Figure, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Manga = () => {
  let [manga, setManga] = useState([]);

  const MyManga = () => {
    fetch("http://localhost:3001/manga", {
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
        console.log("manga arrivati ", res);
        setManga(res);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  useEffect(() => {
    MyManga();
  }, []);
  return (
    <Container>
      <Row>
        <h3 className="text-light">Manga</h3>
        <Col className="dis">
          {manga &&
            manga.map((mangaList, i) => {
              return (
                <Link key={i} to={`/manga/${mangaList.id}`}>
                  <Figure className="figure" key={i}>
                    <div>
                      <div className="d-flex">
                        <i className="bi bi-bookmark-star"></i>
                      </div>
                      <Figure.Image
                        width={173}
                        height={180}
                        className="fi"
                        alt="171x180"
                        value={mangaList}
                        src={mangaList.immagine}
                      />
                    </div>

                    <Figure.Caption className="text-light ti">
                      {mangaList.titolo}
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
export default Manga;
