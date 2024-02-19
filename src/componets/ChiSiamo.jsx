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
                <Modal.Title>ITALIANO</Modal.Title>
              </Modal.Header>
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
                  qui e Github per recruiter e sviluppatori.
                </p>
                <div className="divisore">
                  <a href="https://www.linkedin.com/in/domenico-schipelliti-1663b92a6/">
                    <i className="bi bi-linkedin">Linkedin</i>
                  </a>
                  <a
                    href="https://github.com/Domenicoschipelliti"
                    className="gi"
                  >
                    <i className="bi bi-github">Github</i>
                  </a>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </div>
        </Col>
        {/* ----------------------------------INGLESE------------------------------------- */}
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
                <Modal.Title>ENGLISH</Modal.Title>
              </Modal.Header>
              <Modal.Header className="color">
                <Modal.Title>What is FunWord?</Modal.Title>
              </Modal.Header>

              <Modal.Body className="color">
                <p>
                  A world of anime and manga in which you can express your
                  opinion on the topic
                </p>
              </Modal.Body>
              <Modal.Header className="color">
                <Modal.Title>What does the logo represent?</Modal.Title>
              </Modal.Header>
              <Modal.Body className="color">
                <p>
                  A mushroom with a wink that gives joy to all people here is
                  our mascot :D.Also I thank Violex_Feyri for the creation of
                  it.
                </p>
              </Modal.Body>
              <Modal.Header className="color">
                <Modal.Title>
                  But wasn't this section supposed to describe who you are?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="color">
                <p>
                  Well yes it is since I'm describing mine passion in this
                  project xD. Anyway, nice to meet you. I'm Domenico Schipelliti
                  creator of FunWord and I hope to be able to establish a bond
                  between creator and users. For those who would like to
                  collaborate on project is welcome and contact me via Likedin
                  which I leave here and GitHub for recruiter and developers.
                </p>
                <div className="divisore">
                  <a href="https://www.linkedin.com/in/domenico-schipelliti-1663b92a6/">
                    <i className="bi bi-linkedin">Linkedin</i>
                  </a>
                  <a
                    href="https://github.com/Domenicoschipelliti"
                    className="gi"
                  >
                    <i className="bi bi-github">Github</i>
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
