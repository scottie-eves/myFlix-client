import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({
  movies,
  token,
  user,
  setUser,
  handleReload,
}) => {
  return (
    <div>
      <h4>Your Favorite Movies</h4>
      {movies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col sm={6} md={5} key={movie.id} className="mb-4">
              <MovieCard
                movie={movie}
                user={user}
                setUser={setUser}
                token={token}
                handleReload={() => handleReload()}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};