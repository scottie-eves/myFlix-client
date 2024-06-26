import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ movies, token }) => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const favoriteMovies = movies.filter((movie) => {
    return localUser.favoriteMovies.includes(movie._id);
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://flix-vault-253ef352783e.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login Failed");
      }
    });
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(
          `https://flix-vault-253ef352783e.herokuapp.com/users`,
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
          {favoriteMovies.map((movie) => (
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
