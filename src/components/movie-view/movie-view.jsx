import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const {movieId} = useParams();

  if (!movies || movies.length === 0) {
    console.error("Movies array is undefined or empty");
    return <div>Loading...</div>;
  }

  // log to check the movieId and movies
  console.log('movieId from useParams:', movieId);
  console.log('List of _id fields from movies:', movies.map(m => m.id));

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    console.error(`No movie found with ID: ${movieId}`);
    return <div>No movie was found.</div>;
  }

    return (
      <Card className="h-100">
        <Row>
          <Col>
          <Card.Img variant="top" src={movie.ImagePath} alt="Image Placeholder Text" />
          </Col>
          <Col>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{"Director: " + movie.director}</Card.Text>
            <Card.Text>{"Genre: " + movie.genre}</Card.Text>
            <Card.Text>{"Description: " + movie.description}</Card.Text>
            <Link to="/">
            <Button variant="info" className="primary-button_custom">Back</Button>
            </Link>
          </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };