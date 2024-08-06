import { Card } from "react-bootstrap";

const MyFooter = () => {
  return (
    <>
      <Card className="text-center text-light">
        <Card.Body className="theme">
          <Card.Title>
            Socials For More Information About Anime and Manga
          </Card.Title>
          <Card.Text>
            <div className="di">
              <div>
                {" "}
                <i className="bi bi-instagram">FunWord</i>
              </div>
              <div>
                {" "}
                <i className="bi bi-twitter-x">Fun_Word</i>
              </div>
              <div>
                {" "}
                <i className="bi bi-github">Fun-Dev</i>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-light pa theme">Funword-2024</Card.Footer>
      </Card>
    </>
  );
};
export default MyFooter;
