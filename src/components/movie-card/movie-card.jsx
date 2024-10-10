import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, addFavorite, deleteFavorite, user }) => {

    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>Directed by: {movie.director}</Card.Text>
          <Row>
          <Col>
            <Link to={`/movies/${movie.id}`}>
              <Button variant="primary" className="primary-button_custom">
                Open
              </Button>
            </Link>
          </Col>
          <Col>
              <Button
                variant='primary'
                className='primary-button_custom'
                onClick={() => deleteFavorite(movie.id)}
              >
                Unfavorite
              </Button>
              <Button
                variant='primary'
                className='primary-button_custom'
                onClick={() => addFavorite(movie.id)}
              >
                Favorite
              </Button>
          </Col>
        </Row>
        </Card.Body>
      </Card>
    );
  };

  MovieCard.PropTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Director: PropTypes.string.isRequired
    }).isRequired,
  };

  export default MovieCard;