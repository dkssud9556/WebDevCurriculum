const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('./config');
const User = require('./model').User;

const getBody = (event) => {
  if (event.body) {
    return JSON.parse(event.body);
  }
}

exports.login = async (event) => {
  const body = getBody(event);
  const user = await User.findByPk(body.username);
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: 'Invalid login info',
        statusCode: 403
      })
    };
  }
  const token = jwt.sign({ username: body.username }, config.JWT_SECRET, { expiresIn: '2d'});
  return {
    statusCode: 200,
    headers: { "Set-Cookie": `token=${token}; httpOnly; Path=/` },
    body: JSON.stringify({
      message: 'Login success',
      statusCode: 200
    })
  };
}