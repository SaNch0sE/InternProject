import { Router as ERouter } from 'express';

import BooksComponent from '.';

class Router {
    /**
     * Express router to mount books related functions on.
     * @type {Express.Router}
     * @const
     */
    private readonly router: ERouter = ERouter();

    constructor() {
        const router = ERouter();
        /**
         * Route serving list of books.
         * @name /v1/books
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        router.get('/', BooksComponent.chart);

        /**
         * Route serving list of books.
         * @name /v1/books
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        router.get('/chart', BooksComponent.page);
        this.router = router;
    }

    check(): ERouter {
        return this.router;
    }
}

export default new Router().check();
