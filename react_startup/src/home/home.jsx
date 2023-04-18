import React from 'react';
import { NavLink } from 'react-router-dom';

export function Home() {
	return (
		<div>
			<main>
				<div id="feed">
				</div>
			</main>


			<footer>
				<span><NavLink to="/">PEOPLE</NavLink></span>
				<span><NavLink to="/">SEARCH</NavLink></span>
				<span><NavLink onclick="gamesPulldown()">GAMES</NavLink></span>
				<ul id="filter" hidden></ul>
			</footer>
		</div>
	);
}