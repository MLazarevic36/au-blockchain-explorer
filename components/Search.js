import { useState } from "react"

const Search = ({ router, placeholder, hrefParam }) => {
	const [searchValue, setSearchValue] = useState("")

	const handleRedirect = () => {
		router.push(`?${hrefParam}=${searchValue}`, undefined, { shallow: true })
	}

	return (
		<div className="form-control">
			<div className="input-group">
				<input
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					type="text"
					placeholder={placeholder || "Search…"}
					className="input input-bordered"
				/>
				<button className="btn btn-square" onClick={() => handleRedirect()}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default Search
