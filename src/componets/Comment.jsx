import { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import User from "./User";

const Comment = ({ idMessaggio }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [del, setDel] = useState(false);
  const [com, setCom] = useState([]);
  const [utente, setUtente] = useState([]);
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
  const Subuser = () => {
    fetch(`http://localhost:3001/users/me`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("utente ", res);
          return res.json();
        }
      })
      .then((res) => {
        setUtente([res]);
        console.log("utente2 ", utente);
      })
      .catch((err) => {
        throw new Error("errore nella get utente ", err);
      });
  };
  useEffect(() => {
    Subuser();
  }, [localStorage.getItem("accessToken")]);
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
  const commentdelete = (commentId) => {
    fetch(`http://localhost:3001/commenti/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      "Content-Type": "application/json",
    })
      .then((res) => {
        if (res.ok) {
          console.log("id ", idMessaggio);
          setCom(com.filter((comment) => comment.idMessaggio !== commentId));
          setDel(true);
        } else {
          throw new Error("errore nella delete commenti");
        }
      })

      .catch((err) => {
        console.log("errore specififcato ", err);
      });
  };

  useEffect(() => {
    Getmess();
  }, [messaggio, del, idMessaggio]);
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

        <Offcanvas.Body className="colu">
          {com.map((co) => (
            <div key={co.idMessaggio} className="d-flex comme">
              <p className="d-flex">
                <div>
                  <User />
                </div>
                <div>{co.messaggio} </div>
              </p>
              <div className="d-flex">
                {utente &&
                  utente.map((commentUser) => {
                    return (
                      commentUser.role === "ADMIN" && (
                        <div className="d-flex">
                          <i
                            class="bi bi-trash3"
                            onClick={() => {
                              commentdelete(co.idMessaggio);
                            }}
                          ></i>
                        </div>
                      )
                    );
                  })}
              </div>
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
