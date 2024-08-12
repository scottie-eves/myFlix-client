import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100" onClickCapture={() => onMovieClick(movie)}>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Director: PropTypes.string.isRequired,
    }).isRequired,
  };