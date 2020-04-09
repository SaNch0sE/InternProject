import BookServices from './service';
import ISchema from '../interfaces/IScema';
import IResponse from '../interfaces/IResponse';

class BooksComponent {
    /**
     * @method
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {Promise < void >}
     */
    public async chart(req, res, next): Promise<Express.Response> {
        try {
            const books: ISchema[] = await BookServices.getChartData();
            const map: Map<string, number> = new Map();
            books.forEach((el) => {
                const code: string = el.code3;
                if (Number.isNaN(map[code])) {
                    map[code] = 1;
                } else {
                    map[code] += 1;
                }
            });
            const data: IResponse[] = Object.keys(map).map((key) => ({ code3: key, value: map[key] }));
            return res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({
                message: error.name,
                details: error.message,
            });

            return next(error);
        }
    }

    /**
     * @method
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @returns {Promise < void >}
     */
    public async page(req, res, next): Promise<Express.Response> {
        try {
            return res.sendFile('index');
        } catch (error) {
            res.status(500).send(`message: ${error.name},\n
            details: ${error.message}`);

            return next(error);
        }
    }
}

export default new BooksComponent();
