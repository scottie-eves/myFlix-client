import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        _id: ObjectId('6601c900c6884160b8d14a0f'),
        Title: 'Seven',
        Description: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
        Genre: {
          Name: 'Thriller',
          Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
        },
        Director: {
          Name: 'David Fincher',
          Bio: 'David Andrew Leo Fincher is an American film director and producer.',
          Birth: '1962'
        },
        ImagePath: 'seven.png',
        Featured: true
      },
      {
        _id: ObjectId('6601c9e5c6884160b8d14a14'),
        Title: 'The Godfather',
        Description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        Genre: {
          Name: 'Crime',
          Description: 'Crime films revolve around the sinister actions of criminals or mobsters, particularly bank robbers, underworld figures, or ruthless hoodlums who operate outside the law, stealing and murdering their way through life.'
        },
        Director: {
          Name: 'Francis Ford Coppola',
          Bio: 'Francis Ford Coppola is an American film director, producer, and screenwriter.',
          Birth: '1939'
        },
        ImagePath: 'thegodfather.png',
        Featured: true
      },
      {
        _id: ObjectId('6601c946c6884160b8d14a13'),
        Title: 'The Shawshank Redemption',
        Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        Genre: {
          Name: 'Drama',
          Description: 'Drama film is a film genre that depends mostly on in-depth development of realistic characters dealing with emotional themes. Dramatic themes such as alcoholism, drug addiction, infidelity, moral dilemmas, racial prejudice, religious intolerance, poverty, class divisions, violence against women, and corruption put characters in conflict with themselves, others, society, or even natural phenomena.'
        },
        Director: {
          Name: 'Frank Darabont',
          Bio: 'Frank Darabont is a Hungarian-American film director, screenwriter, and producer.',
          Birth: '1959'
        },
        ImagePath: 'shawshankredemption.png',
        Featured: true
      },
      {
        _id: ObjectId('6601c934c6884160b8d14a12'),
        Title: 'Inception',
        Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        Genre: {
          Name: 'Sci-Fi',
          Description: 'Science fiction film is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies.'
        },
        Director: {
          Name: 'Christopher Nolan',
          Bio: 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century.',
          Birth: '1970'
        },
        ImagePath: 'inception.png',
        Featured: true
      },
      {
        _id: ObjectId('6601c1e8c6884160b8d14a0e'),
        Title: 'Silence of the Lambs',
        Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.',
        Genre: {
          Name: 'Thriller',
          Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
        },
        Director: {
          Name: 'Jonathan Demme',
          Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
          Birth: '1944',
          Death: '2017'
        },
        ImagePath: 'silenceofthelambs.png',
        Featured: true,
        Actors: [ 'Kasi Lemmings' ]
      },
      {
        _id: ObjectId('6601c9f4c6884160b8d14a15'),
        Title: 'The Matrix',
        Description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        Genre: {
          Name: 'Action',
          Description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases.'
        },
        Director: {
          Name: 'Lana Wachowski',
          Bio: 'Lana Wachowski is an American film director, screenwriter, and producer.',
          Birth: '1965'
        },
        ImagePath: 'thematrix.png',
        Featured: true
      },
      {
        _id: ObjectId('6601ca12c6884160b8d14a17'),
        Title: 'The Avengers',
        Description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        Genre: {
          Name: 'Action',
          Description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases.'
        },
        Director: {
          Name: 'Joss Whedon',
          Bio: 'Joss Whedon is an American film and television director, producer, writer, and composer.',
          Birth: '1964'
        },
        ImagePath: 'theavengers.png',
        Featured: true
      },
      {
        _id: ObjectId('6601ca03c6884160b8d14a16'),
        Title: 'The Social Network',
        Description: 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.',
        Genre: {
          Name: 'Drama',
          Description: 'Drama film is a film genre that depends mostly on in-depth development of realistic characters dealing with emotional themes.'
        },
        Director: {
          Name: 'David Fincher',
          Bio: 'David Andrew Leo Fincher is an American film director and producer.',
          Birth: '1962'
        },
        ImagePath: 'thesocialnetwork.png',
        Featured: true
      },
      {
        _id: ObjectId('6601c913c6884160b8d14a10'),
        Title: 'Gone Girl',
        Description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
        Genre: {
          Name: 'Thriller',
          Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
        },
        Director: {
          Name: 'David Fincher',
          Bio: 'David Andrew Leo Fincher is an American film director and producer.',
          Birth: '1962'
        },
        ImagePath: 'gonegirl.png',
        Featured: true
      }
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
