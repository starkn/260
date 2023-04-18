import React from 'react';
import { NavLink } from 'react-router-dom';

export function Viewer() {
	return (
		<div>
			<main style="display:flex;align-items:flex-end;">
				<div id="chat-feed">
				</div>
			</main>


			<footer>
				<span><NavLink to="/">HOME</NavLink></span>
				<input class="chat-box" type="text" id="chat-box" placeholder="Type your message" />
				<button class="chat-send" id="chat-send" onclick="send()">&#10853;</button>
			</footer>
		</div>
	);
}