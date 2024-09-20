import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ movie, token }) => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("User"));

  const favoriteMovies = movie.filter((movie) => {
    return localUser.FavoriteMovies.includes(movie._id);
  });

  const formData = {
    Username: username,
    Password: password,
    Email: email
  };

  const handleSubmit = (event) => {
    event.preventDefault(event);

    fetch(
      `https://flix-vault-253ef352783e.herokuapp.com/users/${storedUser.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Failed");
      }
    });
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(
          `https://flix-vault-253ef352783e.herokuapp.com/users/${storedUser.Username}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUser(data);
        setisUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [token, isUserUpdated]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="userProfile">
        <Form.Label>Update Profile</Form.Label>
        <Form.Control type="text" value={user.username} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={user.email} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={user.birthday} />
      </Form.Group>
      <Button type="submit">Update</Button>
      <Form.Group>
        <Form.Label>Favorite Movies</Form.Label>
        <div className="favorite-movies">
          {FavoriteMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} user={user} />
          ))}
        </div>
      </Form.Group>
      <Button onClick={() => handleDeregister(user._id)}>Deregister</Button>
    </Form>
  );

  // Handle deregister
  async function handleDeregister(userId) {
    try {
      await axios.delete(`/users/${userId}`);
      alert("Deregister successful");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
};

export default ProfileView;
