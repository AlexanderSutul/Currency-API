import http from 'http';
import {Listener} from './listeners/Listener';
import {RouteCurrencyList, RoutesList, RouteCurrency, RouteCurrencyInfo} from './Routes/Currencies/CurrencyRouters';

const runServer = async ()  => {
    const listener = new Listener();
    listener.addRoute(new RouteCurrency());
    listener.addRoute(new RouteCurrencyList());
    listener.addRoute(new RouteCurrencyInfo());
    listener.addRoute(new RoutesList(listener.routes));
    const server = http.createServer((req, res) => listener.listenRoutes(req, res));
    server.listen(4300);
};

runServer();
