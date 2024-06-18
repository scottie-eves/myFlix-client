import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://flix-vault-253ef352783e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.movies.map((movies) => {
        return {
          id: movies.id,
          title: movies.title,
          image: movies.ImagePath,
          director: movies.director_name?.[0],
        };
      });

      setMovies(moviesFromApi);
    });
  }, [token]);

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
          ) : movies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            <Col md={8}>
              <MovieView movies={movies} />
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
            <Col>The list is empty!</Col>
          ) : (
            <>
            {movies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={3}>
                <MovieCard movie={movie} />
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
