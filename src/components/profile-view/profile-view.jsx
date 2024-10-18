import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ user, token, addFavorite, deleteFavorite }) => {
  const [profileUser, setProfileUser] = useState(user || {});
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storedUser = user || localUser;  // Fallback to localStorage user if not passed as prop
  const authToken = token || localStorage.getItem("token");

  useEffect(() => {
    const getProfileData = async () => {
      if (!storedUser || !authToken) return;  // If user/token is missing, don't make the API call

      try {
        const { data } = await axios.get(
          `https://flix-vault-253ef352783e.herokuapp.com/users/${storedUser.Username}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setProfileUser(data);
        setIsUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [authToken, isUserUpdated]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      Username: profileUser.Username,  // Using state to handle form data
      Password: profileUser.Password,
      Email: profileUser.Email,
    };

    fetch(
      `https://flix-vault-253ef352783e.herokuapp.com/users/${storedUser.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Profile updated successfully!");
        setIsUserUpdated(true);  // Trigger useEffect to refresh data
      } else {
        alert("Profile update failed.");
      }
    });
  };

  const favoriteMovies = profileUser.FavoriteMovies || [];  // Safeguard in case favoriteMovies is undefined

  const favoriteMovieObjects = favoriteMovies.map((movieId) => 
  movies.find((movie) => movie._id === movieId)
);

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={profileUser.Username || ""}
          onChange={(e) =>
            setProfileUser({ ...profileUser, Username: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={profileUser.Email || ""}
          onChange={(e) =>
            setProfileUser({ ...profileUser, Email: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={profileUser.Birthday || ""}
          onChange={(e) =>
            setProfileUser({ ...profileUser, Birthday: e.target.value })
          }
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Profile
      </Button>

      <h3>Your Favorite Movies</h3>
      <Row className="favorite-movies">
        {favoriteMovieObjects.length > 0 ? (
          favoriteMovieObjects.map((movie) => (
            movie && (
              <Col key={movie._id} md={3}>
            <MovieCard
            movie={movie}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
             />
             </Col>
            )
          ))
        ) : (
          <p>You have no favorite movies.</p>
        )}
      </Row>

      <Button variant="danger" onClick={() => handleDeregister(profileUser._id)}>
        Deregister
      </Button>
    </Form>
  );

  async function handleDeregister(userId) {
    try {
      await axios.delete(
        `https://flix-vault-253ef352783e.herokuapp.com/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Account successfully deleted.");
      localStorage.clear(); // Clear localStorage after deletion
      window.location.reload(); // Reload the page
    } catch (err) {
      console.error(err);
      alert("De-registration failed.");
    }
  }
};

export default ProfileView;
