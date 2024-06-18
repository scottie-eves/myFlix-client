import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
<<<<<<< Updated upstream
=======
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
>>>>>>> Stashed changes

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Seven",
      image:
        "seven.jpg",
      director: "David Fincher",
    },
    {
      id: 2,
      title: "The Godfather",
      image:
        "thegodfather.jpg",
      director: "Francis Ford Coppola",
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      image:
        "shawshankredemption.jpg",
      director: "Frank Darabont",
    },
    {
      id: 4,
      title: "Inception",
      image:
        "inception.jpg",
      director: "Christopher Nolan",
    },
    {
      id: 5,
      title: "Silence of the Lambs",
      image:
        "silenceofthelambs.jpg",
      director: "Jonathan Demme",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

<<<<<<< Updated upstream
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The List is empty!</div>;
  }

  return (
    <div>
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
=======

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
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          Log in:
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or Sign Up!
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
>>>>>>> Stashed changes
  );
};
