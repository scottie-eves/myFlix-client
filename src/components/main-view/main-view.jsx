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

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);


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
          id: doc.id,
          title: doc.Title,
          image: doc.ImagePath,
          director: doc.Director_name?.[0],
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
        path="/movies/:MovieId"
        element={
          <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : movies.length === 0 ? (
            <Col>Empty list of movies!</Col>
          ) : (
            <Col md={8}>
              <MovieView movie={movies} />
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
            <Navigate to="/profile" />
          ) : (
            <Col md={5}>
              <ProfileView onLoggedIn={(user) => setUser(user)} />
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
                  <Col className="mb-4" key={movies.id} md={3}>
                    <MovieCard movie={movies} />
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

