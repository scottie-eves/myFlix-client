import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

const ProfileView = ({ movies, token }) => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);

  const storedUser = localStorage.getItem("User");
  const localUser = storedUser ? JSON.parse(storedUser) : null;

  if (!localUser) {
    console.error("user data is not available in localStorage.");
    return <div>Error: User data is missing. Please log in again.</div>;
  }

  const favoriteMovies = movies ? movies.filter((movie) => localUser.FavoriteMovies.includes(movie._id)) : []; 

  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");

  const formData = {
    Username: username,
    Password: password,
    Email: email
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!localUser || !localUser.Username) {
      alert("user data is missing. Cannot update profile.");
      return;
    }

    fetch(
      `https://flix-vault-253ef352783e.herokuapp.com/users/${localUser.Username}`,
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
          `https://flix-vault-253ef352783e.herokuapp.com/users/${localUser.Username}`,
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
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
