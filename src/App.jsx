import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { HeroSection } from "./components/HeroSection";
import { NavBar } from "./components/NavBar";
import { SearchArea } from "./components/SearchArea";
import { MovieList } from "./components/MovieList";
import { FavoriteList } from "./components/FavoriteList";

function App() {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const favoriteMovies = JSON.parse(
			localStorage.getItem("favorite-movies")
		);

		if (favoriteMovies) {
			setFavorites(favoriteMovies);
		}
	}, []);

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${
			import.meta.env.VITE_API_KEY
		}`;
		try {
			const response = await fetch(url);
			const responseJson = await response.json();
			if (responseJson.Search) {
				setMovies(responseJson.Search);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const saveToLocalStorage = (items) => {
		localStorage.setItem("favorite-movies", JSON.stringify(items));
	};

	const removeFavoriteMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	const addToFavorites = (value) => {
		const newFavorites = [...favorites, value];
		setFavorites(newFavorites);
		saveToLocalStorage(newFavorites);
	};

	return (
		<>
			<NavBar />
			<Container>
				<HeroSection />
				<SearchArea
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>
				<MovieList movies={movies} addToFavorites={addToFavorites} />
				<FavoriteList favorites={favorites} removeFavoriteMovie={removeFavoriteMovie} />
			</Container>
		</>
	);
}

export default App;
