import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ProfileView  from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? {...storedUser, FavoriteMovies: storedUser.FavoriteMovies || [] } : { FavoriteMovies: [] });
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const saveUserToLocalStorage = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist updated user to localStorage
  };

  const addFavorite = (movieId) => {

    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }

    if (user.FavoriteMovies.includes(movieId)) {
      console.log('Movie is already in favorites');
      return;
    }
    // Make API call to add favorite
    fetch(`https://flix-vault-253ef352783e.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add movie to favorites');
      }
      return response.json();
    })
    .then((updatedUser) => {
      const updatedMovies = movies.map((movie) => {
        if (movie._id === movieId) {
          return { ...movie, isFavorite: true };  // Update movie in local state
        }
        return movie;
      });
  
      setMovies(updatedMovies);
      setUser(updatedUser);  // Set the updated user received from the server
      console.log('Updated user:', user);
      console.log('Updated movies:', movies);
      saveUserToLocalStorage(updatedUser);  // Save updated user to localStorage
    })
    .catch((error) => {
      console.error('Error adding favorite movie:', error);
    });
  };
  
  
  const deleteFavorite = async (movieId) => {
    if (!user.FavoriteMovies.includes(movieId)) {
      console.log('Movie is not in favorites');
      return;
    }
  
    try {
      // Make API call to remove favorite
      const response = await fetch(`https://flix-vault-253ef352783e.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove movie from favorites');
      }
  
      const updatedUser = await response.json();
  
      // Update state with the returned updated user data
      setUser(updatedUser);
      setProfileUser(updatedUser); // Ensure ProfileView reflects the update
      saveUserToLocalStorage(updatedUser);
  
      // Update movie's favorite status in local movie list
      const updatedMovies = movies.map((movie) => 
        movie._id === movieId ? { ...movie, isFavorite: false } : movie
      );
  
      setMovies(updatedMovies);
  
      console.log('Updated user:', updatedUser);
      console.log('Updated movies:', updatedMovies);
  
    } catch (error) {
      console.error('Error removing favorite movie:', error);
      alert('Failed to remove favorite movie.');
    }
  };
  

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://flix-vault-253ef352783e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const moviesFromApi = data.map((doc) => {
        return {
          _id: doc._id,
          title: doc.Title,
          image: doc.ImagePath,
          director: doc.Director?.Name || "Unknown",
          genre: doc.Genre?.Name || "Unknown",
          description: doc.Description,
        };
      });
      setMovies(moviesFromApi);
    });
  }, [token]);

  console.log("user" , user);

  return (
    <BrowserRouter>
    <NavigationBar
    user={user}
    onLoggedOut={() => {
      setUser(null);
      setToken(null);
    }}
    />
    <Row className="justify-content-md-center">
      <Routes>
        <Route
        path="/signup"
        element={
          <>
          {user ? (
            <Navigate to="/" />
          ) : (
            <Col md={5}>
              <SignupView />
            </Col>
          )}
          </>
        }
        />
        <Route
        path="/login"
        element={
          <>
          {user ? (
            <Navigate to="/" />
          ) : (
            <Col md={5}>
              <LoginView onLoggedIn={(user) => setUser(user)} />
            </Col>
          )}
          </>
        }
        />
        <Route
        path="/movies/:movieId"
        element={
          <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : (
            <Col md={8}>
              <MovieView movies={movies} />
            </Col>
          )}
          </>
        }
        />
         <Route
        path="/profile"
        element={
          <>
          {user ? (
            <ProfileView 
            user={user} 
            token={token}
            movies={movies}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
             />
          ) : (
            <Col md={5}>
              <Navigate to="/login" replace />
            </Col>
          )}
          </>
        }
        />
        <Route
        path="/"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>No movies!</Col>
              ) : (
                <>
                {movies.map((movies) => (
                  <Col className="mb-4" key={movies._id} md={3}>
                    <MovieCard 
                    movie={movies}
                    user={user}
                    addFavorite={() => addFavorite(movies._id)}
                    deleteFavorite={() => deleteFavorite(movies._id)}
                     />
                  </Col>
                ))}
                </>
              )}
            </>
        }
        />
        </Routes>
        </Row>
        </BrowserRouter>
  );
};

