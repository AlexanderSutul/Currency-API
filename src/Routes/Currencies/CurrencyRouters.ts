import {IRoute} from "../../listeners/Listener";
import {CurrencyService} from "../../services/currency.service";
import {IncomingMessage, ServerResponse} from "http";

export class RouteCurrency implements IRoute {

    path: string = 'currencies';

    async handler(req: IncomingMessage, res: ServerResponse) {
        const currencyService = await CurrencyService.getCurrency();
        let url = req.url || '';
        const currency = url.split('/')[2];
        if (currency) {
            const data = currencyService.getRateByCurrency(currency);
            return {[currency.toUpperCase()]: data};
        } else {
            const data = currencyService.response.Valute;
            return {Valute: data};
        }
    }
}

export class RouteCurrencyList implements IRoute {
    path: string = 'currencies-list';

    async handler(req: IncomingMessage, res: ServerResponse) {
        const currenciesService = await CurrencyService.getCurrency();
        return {currencies: currenciesService.currenciesList};
    }
}

export class RoutesList implements IRoute {

    routes: IRoute[] = [];

    constructor(routes: IRoute[]) {
        this.routes = routes;
    }

    path: string = 'routes';

    handler(req: IncomingMessage, res: ServerResponse): any {
        return {routes: this.routes.map(route => route.path)};
    }
}

export class RouteCurrencyInfo implements IRoute {
    path: string = 'info';

    async handler(req: IncomingMessage, res: ServerResponse) {
        const currencyService = await CurrencyService.getCurrency();
        const { Valute, ...other } = currencyService.response;
        return {info: other};
    }
}
