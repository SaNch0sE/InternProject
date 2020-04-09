import * as http from 'http';
import Events from './events';
import Server from './server';

class App {
    private readonly _port: number = Server.get('port');

    public run(): void {
        Events.bind(http.createServer(Server).listen(this._port), this._port);
    }
}

new App().run();
