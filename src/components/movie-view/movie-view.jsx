import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { MovieID } = useParams();
  const [movies] = useState(movies.find((movies) => movies.id == MovieID));
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(MovieID)) {
      setIsFavorite(true);
    }
  }, [MovieID]);

  const handleAddFavorite = async (MovieID) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `https://flix-vault-253ef352783e.herokuapp.com/users/${user.Username}/movies/${MovieID}`,
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
      updateAction(MovieID);
      alert("Movie was added to your favorites!");
    } catch (error) {
      console.log(`An error occurred adding the favorite movie: ${error.message}`);
    }
  };

  const handleRemoveFavorite = async (MovieID) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `https://flix-vault-253ef352783e.herokuapp.com/users/${user.Username}/movies/${MovieID}`,
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
      updateAction(MovieID);
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
        <img className="w-100" src={movies.ImagePath} alt={movies.Title} />
      </Col>
      <Col lg={6} md={12}>
        <div className="mb-3">
          <span>
            <strong>Title: </strong>
          </span>
          <span>{movies.Title}</span>
        </div>
        <div className="mb-3">
          <span>
            <strong>Description: </strong>
          </span>
          <span>{movies.Description}</span>
        </div>
        <div className="mb-3">
          <span>
            <strong>Genre: </strong>
          </span>
          <div>
            <span>
              <strong>Name: </strong>
            </span>
            <span>{movies.Genre.Name}</span>
          </div>
          <div>
            <span>
              <strong>Description: </strong>
            </span>
            <span>{movies.Genre.Description}</span>
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
            <span>{movies.Director.Name}</span>
          </div>
          <div>
            <span>
              <strong>Bio: </strong>
            </span>
            <span>{movies.Director.Bio}</span>
          </div>
        </div>
        <div className="mt-auto">
          {isFavorite ? (
            <Button
              className="btn btn-warning"
              onClick={() => handleRemoveFavorite(movies._id)}
            >
              Remove from favorites
            </Button>
          ) : (
            <Button
              className="btn btn-success"
              onClick={() => handleAddFavorite(movies._id)}
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