import {IncomingMessage, ServerResponse} from "http";

export class Listener implements IRequestListener {

    routes: IRoute[] = [];
    title = 'Currency app';

    addRoute(route: IRoute) {
        this.routes.push(route);
    }

    async listenRoutes(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const url = req.url || '';
        const route = this.routes.find(route => url.slice(1).includes(route.path));
        res.setHeader('content-type', 'application/json');
        let result;
        if (!route) {
            res.end(JSON.stringify(new Error('Not now')));
        } else {
            result = await route.handler(req, res);
        }
        res.end(JSON.stringify(result));
    }
}

export interface IRequestListener {
    title: string;

    listenRoutes(req: IncomingMessage, res: ServerResponse): void;
}

export interface IRoute {
    path: string;

    handler(req: IncomingMessage, res: ServerResponse): any;
}

