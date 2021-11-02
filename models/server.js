const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            user: '/api/user',
            auth: '/api/auth',
            category: '/api/category',
            picture: '/api/picture'
        }

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.picture, require('../routes/picture'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;