import { Col, Container, Modal, Row } from "react-bootstrap";

const ChiSiamo = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div
            className="modal show"
            style={{
              display: "block",
              position: "initial",
            }}
          >
            <Modal.Dialog className="color">
              <Modal.Header className="color">
                <Modal.Title>FunWord cosa è?</Modal.Title>
              </Modal.Header>

              <Modal.Body className="color">
                <p>
                  Un mondo di anime e manga nella quale poter esprimere un
                  proprio parere sull'argomento
                </p>
              </Modal.Body>
              <Modal.Header className="color">
                <Modal.Title>Il logo cosa rappresenta?</Modal.Title>
              </Modal.Header>
              <Modal.Body className="color">
                <p>
                  Un fungo con un occhiolino che dà allegria alla gente tutto
                  qui è la nostra mascotte :D.Inoltre ringrazio Violex_Feyri per
                  la creazione di esso.
                </p>
              </Modal.Body>
              <Modal.Header className="color">
                <Modal.Title>
                  Ma questa sezione non doveva descrivere la tua persona?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="color">
                <p>
                  Beh si lo sta facendo visto che sto descrivendo la mia
                  passione in questo progetto xD. Comunque piacere Sono Domenico
                  Schipelliti creatore di FunWord e spero di poter stabilire un
                  legame tra creatore e utenti. Per chi volesse collaborare al
                  progetto è ben venuto e mi contatti tramite Likedin che lascio
                  qui.
                </p>
                <div className="divisore">
                  <a href="https://www.linkedin.com/in/domenico-schipelliti-1663b92a6/">
                    <i class="bi bi-linkedin">Linkedin</i>
                  </a>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ChiSiamo;
