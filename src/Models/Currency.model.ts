export class CurrencyModel {

    response: ICurrencyResponseData;
    private readonly currencies: string[];

    constructor(response: ICurrencyResponseData) {
        this.response = response;
        this.currencies = Object.keys(response.Valute);
    }

    getRateByCurrency(currency: string) {
        currency = currency.toUpperCase();
        return this.response.Valute[currency];
    }

    get currenciesList() {
        return this.currencies;
    }
}

export interface ICurrencyResponseData {
    Date: string;
    PreviousDate: string;
    PreviousURL: string;
    Timestamp: string;
    Valute: {[key: string]: ICurrency}
}

export interface ICurrency {
    ID: string;
    NumCode: string;
    CharCode: string
    Nominal: number;
    Name: string;
    Value: any;
    Previous: number;
}
