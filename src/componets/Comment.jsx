import { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";

const Comment = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [com, setCom] = useState([]);
  const [messaggio, setMessaggio] = useState("");

  const bodyMessage = {
    messaggio: messaggio,
  };

  const Getmess = () => {
    fetch("http://localhost:3001/commenti", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("messaggio ", res);
          return res.json();
        }
      })
      .then((res) => {
        setCom(res);
        console.log("commento ", res);
      })
      .catch((err) => {
        throw new Error("errore nella get commenti ", err);
      });
  };
  const Posmessage = () => {
    fetch(`http://localhost:3001/commenti`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyMessage),
    })
      .then((res) => {
        if (res.ok) {
          console.log("ecco qua ", res);

          return res.json();
        } else {
          throw new Error("errore nella post messaggio");
        }
      })
      .then((res) => {
        console.log("ricerca completata ", res);
        setMessaggio([res]);
        console.log("setdopo ", res);
      })
      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };
  useEffect(() => {
    Getmess();
  }, [messaggio]);
  console.log("mess ", messaggio);
  console.log("com ", com);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2 bu">
        Commenti
      </Button>
      {com &&
        com.map((co, i) => {
          return (
            <Offcanvas
              show={show}
              onHide={handleClose}
              className="com text-light"
              placement="end"
              key={i}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Commenti</Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Header>
                <p>Com: {co.messaggio}</p>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    Posmessage();
                    Getmess();
                  }}
                >
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    onChange={(e) => {
                      setMessaggio(e.target.value);
                    }}
                  >
                    <Form.Label>Commenta</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                  <div className="divisore">
                    <Button type="submit">Pubblica</Button>
                  </div>
                </Form>
              </Offcanvas.Body>
            </Offcanvas>
          );
        })}
    </>
  );
};
export default Comment;
