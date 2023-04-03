const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookie());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// API Function Calls
// Create User
apiRouter.post('/user/create', async (req, res) => {
	if (await DB.getUser(req.body.username)) {
		res.status(409).send({ msg: '\U26A0 This username is taken \U26A0' });
		return;
	}

	const user = await DB.createUser(req.body.username, req.body.password);
	setAuth(res, user.token);

	res.status(200).send({ msg: `Successfully created user ${user.username}` });
});




function setAuth(res, token) {
	res.cookie("token", token, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
	});
}

const httpService = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});