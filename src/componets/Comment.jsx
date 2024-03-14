import { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import User from "./User";

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
        setMessaggio("");
        Getmess();
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
      <Button variant="primary" onClick={handleShow} className="me-2 bu come">
        <i className="bi bi-chat-fill">commenta</i>
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="com text-light"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Commenti</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {com.map((co, i) => (
            <div key={i} className="d-flex">
              <p className="d-flex">
                <div>
                  <User />
                </div>
                <div className="d-flex">{co.messaggio}</div>
              </p>
            </div>
          ))}

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              Posmessage();
            }}
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Commenta</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
              />
            </Form.Group>
            <div className="divisore">
              <Button type="submit" className="come">
                Pubblica
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Comment;
