/* eslint-disable react/prop-types */

export const SearchArea = (props) => {
	const { searchValue, setSearchValue } = props;
	return (
		<div className="row d-flex align-items-center mt-4 ">
			<div className="col">
				<h2>MOVIE LIST:</h2>
			</div>
			<div className="col">
				<input
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					type="text"
					placeholder="Search a movie..."
					className="form-control"
				/>
			</div>
		</div>
	);
};
