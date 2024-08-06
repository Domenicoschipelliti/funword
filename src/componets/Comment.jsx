import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Offcanvas } from "react-bootstrap";
import User from "./User";
import UtentiCommenti from "./UtentiCommenti";
import { useParams } from "react-router-dom";

const Comment = ({ idMessaggio, userId }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [del, setDel] = useState(false);
  const [com, setCom] = useState([]);
  const [utente, setUtente] = useState([]);
  const [utente2, setUtente2] = useState([]);
  const [messaggio, setMessaggio] = useState("");
  const id = useParams();

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
          console.log("utente me ", res);
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
  const Codiceunivoci = (codiceId) => {
    fetch(`http://localhost:3001/users/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("utente_id ", res);
          return res.json();
        } else console.log("errore nella get");
      })
      .then((res) => {
        console.log("id ", userId);
        setUtente2([res]);
        console.log("user ", utente2);
        console.log("utente ", codiceId);
      })
      .catch((err) => {
        throw new Error("errore nella get id utente ", err);
      });
  };
  useEffect(() => {
    Getmess();
  }, [messaggio, del, idMessaggio, userId]);
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
                  {utente.map((use) => {
                    return <Col>{use.nome}</Col>;
                  })}
                </div>
                <div>{co.messaggio}</div>
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
              Codiceunivoci(userId);
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
                onSubmit={() => {
                  if (messaggio.toLowerCase() === "") {
                    <Alert key="danger" variant="danger">
                      devi scrivere un commento
                    </Alert>;
                  }
                }}
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

// import React, { useState, useEffect } from "react";
// import { Button, Offcanvas, Form } from "react-bootstrap";

// const Comment = ({ idMessaggio, userId }) => {
//   const [show, setShow] = useState(false);
//   const [com, setCom] = useState([]);
//   const [messaggio, setMessaggio] = useState("");
//   const [utente, setUtente] = useState([]);

//   const bodyMessage = {
//     messaggio: messaggio,
//   };

//   const getComments = () => {
//     fetch("http://localhost:3001/commenti", {
//       method: "GET",
//       headers: {
//         Authorization: localStorage.getItem("accessToken"),
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error("Errore durante il recupero dei commenti");
//       })
//       .then((data) => {
//         setCom(data);
//         console.log("dati commenti ", data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//     getComments();
//   }, [messaggio, idMessaggio]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("http://localhost:3001/commenti", {
//       method: "POST",
//       headers: {
//         Authorization: localStorage.getItem("accessToken"),
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(bodyMessage),
//     })
//       .then((res) => {
//         if (res.ok) {
//           setMessaggio("");
//           getComments();
//         } else {
//           throw new Error("Errore durante la pubblicazione del commento");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleDelete = (commentId) => {
//     fetch(`http://localhost:3001/commenti/${commentId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: localStorage.getItem("accessToken"),
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           setCom(com.filter((comment) => comment.idMessaggio !== commentId));
//         } else {
//           throw new Error("Errore durante l'eliminazione del commento");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };
//   const Codiceunivoci = (codiceId) => {
//     fetch(`http://localhost:3001/users/${codiceId}`, {
//       headers: {
//         Authorization: localStorage.getItem("accessToken"),
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           console.log("utente_id ", res);
//           return res.json();
//         } else console.log("errore nella get");
//       })
//       .then((res) => {
//         if (res.ok) {
//           console.log("id ", userId);
//           setUtente(utente.filter((ut) => ut.userId !== codiceId));
//           console.log("utente ", codiceId);
//         }
//       })
//       .catch((err) => {
//         throw new Error("errore nella get id utente ", err);
//       });
//   };

//   return (
//     <>
//       <Button
//         variant="primary"
//         onClick={() => setShow(true)}
//         className="me-2 bu come"
//       >
//         <i className="bi bi-chat-fill">commenta</i>
//       </Button>
//       <Offcanvas
//         show={show}
//         onHide={() => setShow(false)}
//         className="com text-light"
//         placement="end"
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Commenti</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body className="colu">
//           {com.map((co) => (
//             <div key={co.idMessaggio} className="d-flex comme">
//               <p className="d-flex">
//                 <div>
//                   {co.user && co.user.nome
//                     ? co.user.nome
//                     : "Nome utente sconosciuto"}
//                 </div>
//                 <div>{co.messaggio}</div>
//               </p>
//               <div className="d-flex">
//                 {co.user && co.user.role === "ADMIN" && (
//                   <div className="d-flex">
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDelete(co.idMessaggio)}
//                     >
//                       <i className="bi bi-trash3"></i>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Commenta</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={messaggio}
//                 onChange={(e) => setMessaggio(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <div className="divisore">
//               <Button type="submit" className="come">
//                 Pubblica
//               </Button>
//             </div>
//           </Form>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// };

// export default Comment;
