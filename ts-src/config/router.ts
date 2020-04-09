import * as express from 'express';
import * as http from 'http';
import BooksRouter from '../components/Books/router';

export default class Router {
    /**
     * @method
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    static init(app: express.Application): void {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/books URI to BooksRouter.
         * @name /v1/books
         * @method
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/books', BooksRouter);

        /**
         * @description No results returned mean the object is not found
         * @method
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @method
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    }
}
