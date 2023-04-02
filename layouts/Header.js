const Header = ({ children }) => {
	return (
		// <div className="navbar bg-base-100">
		// 	<div className="flex-1">
		// 		<a className="btn btn-ghost normal-case text-xl" href="/">
		// 			Home
		// 		</a>
		// 		<a className="btn btn-ghost normal-case text-xl" href="/account">
		// 			Account
		// 		</a>
		// 		<a className="btn btn-ghost normal-case text-xl" href="/nft">
		// 			NFT
		// 		</a>
		// 	</div>
		// </div>
		<div className="drawer">
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				{/* <!-- Navbar --> */}
				<div className="w-full navbar bg-base-300">
					<div className="flex-none lg:hidden">
						<label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-6 h-6 stroke-current"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</label>
					</div>
					{/* <div className="">Navbar Title</div> */}
					<div className="flex-1 px-2 mx-2 hidden lg:block">
						<ul className="menu menu-horizontal">
							{/* <!-- Navbar menu content here --> */}
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/block">Block</a>
							</li>
							<li>
								<a href="/account/">Account</a>
							</li>
							<li>
								<a href="/nft">NFT</a>
							</li>
						</ul>
					</div>
				</div>
				{/* <!-- Page content here --> */}
				{children}
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 bg-base-100">
					{/* <!-- Sidebar content here --> */}
					<li>
						<a>Home</a>
					</li>
					<li>
						<a>Block</a>
					</li>
					<li>
						<a>Account</a>
					</li>
					<li>
						<a>NFT</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Header
