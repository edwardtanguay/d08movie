import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export const NavBar = () => {
	return (
		<Navbar expand="lg" className="">
			<Container>
				<Navbar.Brand href="#">🌐 Movie-Verve</Navbar.Brand>
			</Container>
		</Navbar>
	);
};
