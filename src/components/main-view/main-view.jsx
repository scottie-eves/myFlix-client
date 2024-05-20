import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

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
  );
};
