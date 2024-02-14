import React from "react";

import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
//Firebase
import { signOutUser } from "../../firebase/firebase.utils";
//Components
import { Badge } from "antd";
//Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UserActionTypes } from "../../redux/reducers/user/user.types";

const Header = () => {
	const loggedInUser = useSelector((state) => state.user.currentUser);

	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();

	const handleLogout = () => {
		signOutUser();
		dispatch({ type: UserActionTypes.LOGOUT, payload: null });
	};

	const redirectDashboard = (loggedInUser) => {
		if (loggedInUser && loggedInUser.role === "subcriber") {
			return (
				<li className="nav-item dropdown">
					<NavDropdown title={loggedInUser.name} id="nav-dropdown">
						<NavDropdown.Item eventKey="4.1" href="/user/history">
							History
						</NavDropdown.Item>
						<NavDropdown.Item eventKey="4.2" href="/user/wishlist">
							Wishlist
						</NavDropdown.Item>
						<NavDropdown.Item eventKey="4.3" href="/user/password">
							Password
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item eventKey="4.4" onClick={handleLogout}>
							Log Out
						</NavDropdown.Item>
					</NavDropdown>
				</li>
			);
		} else if (loggedInUser && loggedInUser.role === "admin") {
			return (
				<li className="nav-item dropdown">
					<NavDropdown title={loggedInUser.name} id="nav-dropdown">
						<NavDropdown.Item eventKey="4.1" href="/admin/dashboard">
							Admin
						</NavDropdown.Item>
						<NavDropdown.Item eventKey="4.2" href="/user/history">
							User
						</NavDropdown.Item>

						<NavDropdown.Divider />
						<NavDropdown.Item eventKey="4.4" onClick={handleLogout}>
							Log Out
						</NavDropdown.Item>
					</NavDropdown>
				</li>
			);
		}
	};
	return (
		<nav className="p-3 border-bottom row">
			<ul className="col-md-6 nav-pills nav ">
				<li className="nav-item ">
					<Link to="/" className="nav-link">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/shop" className="nav-link">
						Shop
					</Link>
				</li>

				<li className="nav-item ">
					<Badge count={cartItems.length} className="pt-1">
						<Link to="/cart" className="nav-link">
							Cart
						</Link>
					</Badge>
				</li>
			</ul>
			<ul className="col-md-6 nav-pills nav d-flex justify-content-end ">
				{redirectDashboard(loggedInUser)}

				{!loggedInUser ? (
					<div className="d-flex">
						<li className="nav-item">
							<Link to="/register" className="nav-link">
								Register
							</Link>
						</li>
						<li className="nav-item ">
							<Link to="/login" className="nav-link">
								Login
							</Link>
						</li>
					</div>
				) : (
					""
				)}
			</ul>
		</nav>
	);
};

export default Header;
