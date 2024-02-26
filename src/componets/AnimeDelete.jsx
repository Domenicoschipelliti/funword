import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const AnimeDelete = () => {
  const [del, setDel] = useState([]);
  const id = useParams();
  const [error, setError] = useState(false);
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
          return res.json();
        } else {
          setError(true);
          throw new Error("errore nella delete anime");
        }
      })
      .then((res) => {
        setDel([res]);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  useEffect(() => {
    animedelete();
  }, [id]);

  return (
    <Container>
      {del && <Alert>Contenuto Eliminato</Alert>}

      {error && (
        <Alert show={error} variant="danger">
          delete permessa solo agli admin
        </Alert>
      )}
    </Container>
  );
};
export default AnimeDelete;
