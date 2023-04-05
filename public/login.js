async function loginUser() {
	loginOrCreate(`/api/user/login`);
}

async function createUser() {
	loginOrCreate(`/api/user/create`);
}

async function loginOrCreate(endpoint) {
	const userName = document.querySelector('#username')?.value;
	const password = document.querySelector('#password')?.value;
	const response = await fetch(endpoint, {
		method: 'post',
		body: JSON.stringify({ username: userName, password: password }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const body = await response.json();

	if (response?.status === 200) {
		localStorage.setItem('userName', userName);
		window.location.href = '/index.html';
	} else {
		// const modalEl = document.querySelector('#msgModal');
		// modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
		// const msgModal = new bootstrap.Modal(modalEl, {});
		// msgModal.show();
		console.log(body.msg);
	}
}

function logout() {
	fetch(`/api/user/logout`, {
		method: 'delete',
	}).then(() => (window.location.href = '/'));
}

async function getUser(email) {
	// See if we have a user with the given email.
	const response = await fetch(`/api/user/${email}`);
	if (response.status === 200) {
		return response.json();
	}

	return null;
}

function setDisplay(controlId, display) {
	const playControlEl = document.querySelector(`#${controlId}`);
	if (playControlEl) {
		playControlEl.style.display = display;
	}
}
