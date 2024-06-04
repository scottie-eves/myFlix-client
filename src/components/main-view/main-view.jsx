import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!user) {
    return (
      <>
      <LoginView
      onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}
      />
      or 
      <signupView />
      </>
    );
  }

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

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

  if (selectedMovie) {
    return (
      <>
      <button 
      onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
      >
        Logout
      </button>
      <MovieView
      movie={selectedMovie}
      onBackClick={() => setSelectedMovie(null)}
      />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
      <button 
      onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
      >
        Logout
        </button>
        <div>The List is Empty!</div>
        </>
    );
  }
  return (
    <div>
      <button
      onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
      >
        Logout 
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
