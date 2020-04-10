import Books from './model';
import ISchema from '../interfaces/IScema';

class BookServices {
    /**
     * @method getChartData
     * @param {any}
     * @returns {any}
     */
    public async getChartData(): Promise<ISchema[]> {
        return Books.find({}).select({ code3: 1 });
    }
}

export default new BookServices();
