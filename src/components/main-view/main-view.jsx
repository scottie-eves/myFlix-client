import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import ProfileView from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = ({ movies, user, token, addFavorite, deleteFavorite }) => {
  const [movies, setMovies] = useState([]); // Only keep this line if you need to update movies from an API call

  const saveUserToLocalStorage = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Persist updated user to localStorage
  };

  useEffect(() => {
    if (!token) return;

    fetch("https://flix-vault-253ef352783e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => ({
          _id: doc._id,
          title: doc.Title,
          image: doc.ImagePath,
          director: doc.Director?.Name || "Unknown",
          genre: doc.Genre?.Name || "Unknown",
          description: doc.Description,
        }));
        setMovies(moviesFromApi);
      });
  }, [token]);

  console.log("user", user);

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
              user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={(user) => setUser(user)} /></Col>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              user ? <Col md={8}><MovieView movies={movies} /></Col> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView 
                  user={user} 
                  token={token}
                  movies={movies}
                  addFavorite={addFavorite}
                  deleteFavorite={deleteFavorite}
                />
              ) : (
                <Col md={5}><Navigate to="/login" replace /></Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>No movies!</Col>
              ) : (
                <>
                  {movies.map((movie) => {
                    const isFavorite = user?.favoriteMovies?.includes(movie._id) || false;

                    return (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} user={user} />
                        {isFavorite ? (
                          <button onClick={() => deleteFavorite(movie._id)}>Unfavorite</button>
                        ) : (
                          <button onClick={() => addFavorite(movie._id)}>Favorite</button>
                        )}
                      </Col>
                    );
                  })}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
