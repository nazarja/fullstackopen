const config = require('./utils/config');
const logger = require('./utils/logger');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
server.listen(config.PORT, () => {
	logger.info(`Server running on port: http://localhost:${config.PORT}`);
});

