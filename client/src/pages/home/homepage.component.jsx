import React, { useEffect, useState } from "react";
import { HomePageCategory } from "./../../components/homepage/homepage-category.component";
import { HomePageSubCategory } from "./../../components/homepage/homepage-subcategory.component";
import { NewArrivals } from "./../../components/homepage/homepage-newarrivals.component";
import { BestSellers } from "./../../components/homepage/homepage-bestsellers.component";
import Jumbotron from "./../../components/jumbotron/jumbotron.component";
const Home = () => {
	return (
		<div>
			<div className="jumbotron text-primary h1 font-weight-bold text-center p-5 display-3">
				<Jumbotron text={["New Arrivals", "Best Sellers", "Latest Product"]} />
			</div>
			<h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">
				New Arrivals
			</h4>
			<NewArrivals />
			<h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">
				Best Sellers
			</h4>
			<BestSellers />
			<h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">
				Categories
			</h4>
			<HomePageCategory />
			<h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">
				Sub Categories
			</h4>
			<HomePageSubCategory />
		</div>
	);
};

export default Home;
