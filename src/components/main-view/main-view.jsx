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

  const [user, setUser] = useState(storedUser ? {...storedUser, favoriteMovies: storedUser.favoriteMovies || [] } : { favoriteMovies: [] });
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const saveUserToLocalStorage = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist updated user to localStorage
  };

  const addFavorite = (movieId) => {
    // Find the movie and update its favorite status
    const updatedMovies = movies.map((movie) => {
      if (movie._id === movieId) {
        return { ...movie, isFavorite: true };  // Add a flag for favorites or adjust logic as needed
      }
      return movie;
    });
  
    // Update the movies state with the modified list
    setMovies(updatedMovies);

    const updatedUser = {
      ...user,
      favoriteMovies: [...user.favoriteMovies, movieId]
    };

    setUser(updatedUser);
    saveUserToLocalStorage(updatedUser);
  
    console.log('Updated Movies after Adding Favorite:', updatedMovies);  // Logging for debugging
    console.log('Updated User after Adding Favorite:', updatedUser);
  };
  
  const deleteFavorite = (movieId) => {
    // Find the movie and update its favorite status
    const updatedMovies = movies.map((movie) => {
      if (movie._id === movieId) {
        return { ...movie, isFavorite: false };  // Remove the favorite flag or adjust logic as needed
      }
      return movie;
    });
  
    // Update the movies state with the modified list
    setMovies(updatedMovies);

    const updatedUser = {
      ...user,
      favoriteMovies: user.favoriteMovies.filter((id) => id !== movieId)
    };

    setUser(updatedUser);
    saveUserToLocalStorage(updatedUser);
  
    console.log('Updated Movies after Removing Favorite:', updatedMovies);  // Logging for debugging
    console.log('Updated User after Removing Favorite:', updatedUser);
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

  console.log(movies);

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
            <ProfileView user={user} token={token} />
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
                    addFavorite={addFavorite}
                    deleteFavorite={deleteFavorite}
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

