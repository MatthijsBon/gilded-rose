import React from "react";
import "./App.css";
import { GildedRose } from "./GildedRose";
import { H1 } from "./Text";

const App = (): React.ReactElement => {
	return (
		<div className="container">
			<div className="header">
				<H1>Gilded Rose Inn</H1>
			</div>
			<div className="main">
				<GildedRose />
			</div>
			<div className="footer">
				<div className="socials">
					<div>
						<a href="https://www.linkedin.com/in/matthijs-bon-89a3066a/" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-linkedin"/>
						</a>
					</div>
					<div>
						<a href="https://github.com/MatthijsBon/gilded-rose" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-github"/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
