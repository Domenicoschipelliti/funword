import { useEffect, useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Delete = () => {
  const [del, setDel] = useState([]);
  const id = useParams();
  const [error, setError] = useState(false);
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
          console.log("id ", id);
          return res.json();
        } else {
          setError(true);
          throw new Error("errore nella delete manga");
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
    mangadelete();
  }, [id]);
  console.log(error);
  return (
    <Container>
      <Row>
        {/* {error ? (
          <Alert show={error} variant="danger">
            Delete permessa solo agli admin
          </Alert>
        ) : (
          del && <Alert>Contenuto Eliminato</Alert>
        )} */}
        <Alert>Contenuto Eliminato</Alert>
      </Row>
    </Container>
  );
};
export default Delete;
