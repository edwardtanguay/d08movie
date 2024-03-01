/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import { TbHeartMinus } from "react-icons/tb";

export const FavoriteList = (props) => {
	const { favorites, removeFavoriteMovie } = props;
	return (
		<>
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
									onClick={() => removeFavoriteMovie(movie)}
								/>
							</Card.Body>
						</Card>
					);
				})}
			</div>
		</>
	);
};
