import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { TbHeartMinus } from "react-icons/tb";
import { HeroSection } from "./components/HeroSection";
import Card from "react-bootstrap/Card";
import { RiHeartAddLine } from "react-icons/ri";
import { NavBar } from "./components/NavBar";
import { SearchArea } from "./components/SearchArea";

function App() {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [favorites, setFavorites] = useState([]);

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
				<SearchArea searchValue={searchValue} setSearchValue={setSearchValue} />

				<div className="row nowrap ">
					{movies.map((movie) => {
						return (
							<Card
								className="pt-3 m-3"
								key={movie.imdbID}
								style={{ width: "18rem" }}
							>
								<Card.Img variant="top" src={movie.Poster} />
								<Card.Body className="d-flex align-items-center justify-content-between">
									<Card.Title>
										{movie.Title} ({movie.Year})
									</Card.Title>
									<RiHeartAddLine
										onClick={() => addToFavorites(movie)}
										className="like-icon"
									/>
								</Card.Body>
							</Card>
						);
					})}
				</div>

				{/* Favorite list section */}
				<div className="row d-flex align-items-center mt-4 ">
					<div className="col">
						<h2>Favorites Movies:</h2>
					</div>
				</div>
				<div className="row nowrap ">
					{favorites.map((movie) => {
						return (
							<Card
								className="pt-3 m-3"
								key={movie.imdbID}
								style={{ width: "18rem" }}
							>
								<Card.Img variant="top" src={movie.Poster} />
								<Card.Body className="d-flex align-items-center justify-content-between">
									<Card.Title>
										{" "}
										{movie.Title} ({movie.Year})
									</Card.Title>
									<TbHeartMinus
										className="like-icon"
										onClick={() =>
											removeFavoriteMovie(movie)
										}
									/>
								</Card.Body>
							</Card>
						);
					})}
				</div>
			</Container>
		</>
	);
}

export default App;
