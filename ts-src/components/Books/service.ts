import Books from './model';
import ISchema from '../interfaces/IScema';

class BookServices {
    /**
     * @method getChartData
     * @param {any}
     * @returns {any}
     */
    public async getChartData(): Promise<ISchema[]> {
        return Books.find({}, {
            title: 0,
            titleLength: 0,
            description: 0,
            code3: 1,
            createdAt: 0,
            updatedAt: 0,
        });
    }
}

export default new BookServices();
