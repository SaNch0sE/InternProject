import { config } from 'dotenv';
import * as express from 'express';
import middleware from '../config/middleware';
import routes from '../config/router';

config({ path: '../../.env' });

class Server {
    /**
    * @type {express}
    * @constant {express.Application}
    */
    private app: express.Application;

    constructor() {
        const app = express();
        /**
         * @description express.Application Middleware
         */
        middleware.init(app);

        /**
         * @description express.Application Routes
         */
        routes.init(app);

        /**
         * @description sets port 3000 to default or unless otherwise specified in the environment
         */
        app.set('port', process.env.PORT || 3000);
        this.app = app;
    }

    public get(): express.Application {
        return this.app;
    }
}

export default new Server().get();
