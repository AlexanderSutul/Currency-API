import axios from 'axios';
import {CurrencyModel} from "../Models/Currency.model";

export class CurrencyService {
    static async getCurrency(): Promise<CurrencyModel> {
        const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
        const response = await axios.get(url);
        return new CurrencyModel(response.data);
    }
}
