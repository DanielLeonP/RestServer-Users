const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');
const app = express()

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';
        this.authPath = '/api/auth';

        //DB Conection
        this.conectarDB();
        // Midlewares
        this.midlewares();
        // Routes
        this.routes();
    }
    async conectarDB() {
        await dbConection();
    }
    midlewares() {
        // CORS
        this.app.use(cors());
        // Public Directory
        this.app.use(express.static('public'));
        // Body Parser 
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}
module.exports = Server;