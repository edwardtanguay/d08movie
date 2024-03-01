import { Col, Row, Image } from "react-bootstrap";
import Img from "../assets/image/the-movie-verse.png";

export const HeroSection = () => {
	return (
		<Col className="d-flex gap-4 pt-5 align-items-center ">
			<Row>
				<h1 className="hero-text">Welcome to the Movie Verse</h1>
				<p className="hero-description">
					Find and save your favorite movies
				</p>
			</Row>
			<Row>
				<Image src={Img} alt="Hero image" />
			</Row>
		</Col>
	);
};
