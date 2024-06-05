<<<<<<< Updated upstream
=======
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

>>>>>>> Stashed changes
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100" onClickCapture={() => onMovieClick(movie)}>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  };