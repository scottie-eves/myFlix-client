import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '..movie-card/movie-card';
import Button from 'react-bootstrap/Button';

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, moviesResponse] = await Promise.all([
          axios.get('/users'), // Endpoint to fetch user data
          axios.get('/movies') // Endpoint to fetch movies
        ]);

        const userData = userResponse.data.find(user => user.username === username);
        setUser(userData);
        setMovies(moviesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter user's favorite movies
  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userProfile">
      <Form.Label>Update Profile</Form.Label>
      <Form.Control
      type="text"
      value={username}
      />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control 
        type="email"
        value={email}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control 
        type="date"
        value={birthday}
        />
      </Form.Group>
        <Button type="submit">Update</Button>
        <Form.Group>
            <Form.Label>Favorite Movies</Form.Label>
            <div className="favorite-movies">
        {favoriteMovies.map(movie => (
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
