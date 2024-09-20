import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export const MovieCard = ({ movies, addFavorite, deleteFavorite, user }) => {

  // const isFavorite = user.FavoriteMovies.includes(movies._id);

    return (
      <Card className="h-100">
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text></Card.Text>
          <Row>
          <Col>
            {/* <Link to={`/movies/${encodeURIComponent(movies.id)}`}> */}
              <Button variant="primary" className="primary-button_custom">
                Open
              </Button>
            </Link>
          </Col>
          <Col>
            {isFavorite ? (
              <Button
                variant='primary'
                className='primary-button_custom'
                onClick={() => deleteFavorite(movies.id)}
              >
                Unfavorite
              </Button>
            ) : (
              <Button
                variant='primary'
                className='primary-button_custom'
                onClick={() => addFavorite(movies.id)}
              >
                Favorite
              </Button>
            )}
          </Col>
        </Row>
        </Card.Body>
      </Card>
    );
  };

  MovieCard.PropTypes = {
    movies: PropTypes.shape({
      id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Director: PropTypes.string.isRequired
    }).isRequired,
  };