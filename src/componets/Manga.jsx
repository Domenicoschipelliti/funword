import { useEffect, useState } from "react";
import { Col, Container, Figure, Row } from "react-bootstrap";

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
                <Figure className="figure" key={i}>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={mangaList.immagine}
                  />
                  <Figure.Caption className="text-light">
                    {mangaList.titolo}
                  </Figure.Caption>
                </Figure>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};
export default Manga;
