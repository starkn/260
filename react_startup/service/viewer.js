class Chat {
	name;
	msgBox;
	msgSend;
	feed;
	protocol;
	socket;

	constructor() {
		this.name = localStorage.getItem('userName');
		this.msgBox = document.querySelector('#chat-box');
		this.msgSend = document.querySelector('#chat-send');
		this.feed = document.querySelector('#chat-feed');

		// Adjust the webSocket protocol to what is being used for HTTP
		this.protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
		this.socket = new WebSocket(`${this.protocol}://${window.location.host}/ws`);

		let port = window.location.port;
		if (process.env.NODE_ENV !== 'production') {
			port = 3000;
		}

		this.socket.onopen = (event) => {
			this.appendMsg('system', 'Welcome to the Chat!', '');
		};

		// Display messages we receive from our friends
		this.socket.onmessage = async (event) => {
			const text = await event.data.text();
			const chat = JSON.parse(text);
			this.appendMsg('friend', chat.name, chat.msg);
		};

		// If the webSocket is closed then disable the interface
		this.socket.onclose = (event) => {
			this.appendMsg('system', 'Disconnected from Chat!!', '');
			this.msgBox.disabled = true;
			this.msgSend.disabled = true;
		};

		this.msgBox.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				this.sendMessage();
			}
		});

		if (!this.name) {
			this.msgBox.disabled = true;
			this.msgSend.disabled = true;
		}
	}


	// Send a message over the webSocket
	sendMessage() {
		if (!this.name) {
			//Maybe return error, not logged in
			console.warn("YOU ARE NOT LOGGED IN");
			return;
		}
		const msg = this.msgBox.value;
		if (msg) {
			this.appendMsg('me', this.name, msg);
			this.socket.send(`{"name":"${this.name}", "msg":"${msg}"}`);
			this.msgBox.value = '';
		}
	}

	// Create one long list of messages
	appendMsg(cls, from, msg) {
		let colon = '';
		if (msg) {
			colon = ':';
		}
		this.feed.innerHTML += `<div><span class="${cls}">${from}</span>${colon} ${msg}</div>`
	}
}


var chat;
window.onload = (event) => {
	chat = new Chat();
};

function send() {
	chat.sendMessage();
}