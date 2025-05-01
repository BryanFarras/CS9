const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(helmet());
    app.use(helmet.frameguard({ action: 'deny' }));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted-cdn.com"],
            styleSrc: ["'self'", "trusted-styles.com"],
        },
    }));
    app.use(helmet.strictTransportSecurity({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    }));
    app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
    app.use(helmet.dnsPrefetchControl({ allow: false }));

    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/store', require('./src/routes/store.route'));
    app.use('/user', require('./src/routes/user.route'));
    app.use('/item', require('./src/routes/item.route'));
    app.use('/transaction', require('./src/routes/transaction.route'));

    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} running on port ${PORT}`);
    });
}

const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    startServer();
}
