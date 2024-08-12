import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();
  const [movie] = useState(movie.find((movie) => movie.id == movieId));
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movieId)) {
      setIsFavorite(true);
    }
  }, [movieId]);

  const handleAddFavorite = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `https://flix-vault-253ef352783e.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to add movie to favorites list.");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite(true);
      updateAction(movieId);
      alert("Movie was added to your favorites!");
    } catch (error) {
      console.log(`An error occurred adding the favorite movie: ${error.message}`);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `https://flix-vault-253ef352783e.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to remove movie from the favorites list.");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite(false);
      updateAction(movieId);
      alert("Movie was removed from your favorites!");
    } catch (error) {
      console.log(`An error occurred removing the favorite movie: ${error.message}`);
    }
  };

    return (
      <Row
      className="mt-4"
      style={{ border: '1px solid black', padding: '10px' }}
    >
      <Col lg={6} md={12} className="mb-3">
        <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
      </Col>
      <Col lg={6} md={12}>
        <div className="mb-3">
          <span>
            <strong>Title: </strong>
          </span>
          <span>{movie.Title}</span>
        </div>
        <div className="mb-3">
          <span>
            <strong>Description: </strong>
          </span>
          <span>{movie.Description}</span>
        </div>
        <div className="mb-3">
          <span>
            <strong>Genre: </strong>
          </span>
          <div>
            <span>
              <strong>Name: </strong>
            </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div>
            <span>
              <strong>Description: </strong>
            </span>
            <span>{movie.Genre.Description}</span>
          </div>
        </div>
        <div className="mb-3">
          <span>
            <strong>Director: </strong>
          </span>
          <div>
            <span>
              <strong>Name: </strong>
            </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span>
              <strong>Bio: </strong>
            </span>
            <span>{movie.Director.Bio}</span>
          </div>
        </div>
        <div className="mt-auto">
          {isFavorite ? (
            <Button
              className="btn btn-warning"
              onClick={() => handleRemoveFavorite(movie._id)}
            >
              Remove from favorites
            </Button>
          ) : (
            <Button
              className="btn btn-success"
              onClick={() => handleAddFavorite(movie._id)}
            >
              Add to favorites
            </Button>
          )}
        </div>
        <Link to={`/`}>
          <Button style={{ marginTop: '20px' }} variant="primary">
            Back
          </Button>
        </Link>
      </Col>
    </Row>
    );
  };