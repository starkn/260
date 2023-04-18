import React from 'react';

export function Profile() {
	let username = "";
	return (
	<div>
		<h1>{{ username }}</h1>
		<div>
			<button type="button" class="logout-button" onclick="logout()">Logout</button>
		</div>
	</div>
	);
}