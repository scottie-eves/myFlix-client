import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  console.log('movieId from useParams:', movieId);
  console.log('List of _id fields from movies:', movies.map(m => m._id));
  
  const movie = movies.find((m) => String(m._id) === String(movieId));

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
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{"Director: " + movie.Director}</Card.Text>
            <Card.Text>{"Genre: " + movie.Genre}</Card.Text>
            <Card.Text>{"Description: " + movie.Description}</Card.Text>
            <Link to="/">
            <Button variant="info" className="primary-button_custom">Back</Button>
            </Link>
          </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };