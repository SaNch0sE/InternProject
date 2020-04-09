import * as http from 'http';
import { AddressInfo } from 'net';

class Events {
    // Dummy address for this.address()
    address(): AddressInfo {
        return { address: 'dummy', port: 2, family: '' };
    }

    /**
     * @method
     * @param  {NodeJS.ErrnoException} error
     * @param  {number|string|boolean} port
     * @returns throw error
    */
    onError(error: NodeJS.ErrnoException, port: number | string): never {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bindPort: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        switch (error.code) {
            case 'EACCES':
                console.error(`${bindPort} requires elevated privileges`);
                process.exit(1);
            case 'EADDRINUSE':
                console.error(`${bindPort} is already in use`);
                process.exit(1);
            default:
                throw error;
        }
    }

    /**
     * @method
     * @inner
     * @description log port to console
     */
    onListening(): void {
        const bindPort: string = typeof this.address() === 'string' ? `pipe ${this.address()}` : `port ${this.address().port}`;
        console.log(`Listening on ${bindPort}`);
    }

    /**
     * @method
     * @inner
     * @param {http.Server} Server
     * @param {number} port
     */
    bind(Server: http.Server, port: number): void {
        Server.on('error', (error) => this.onError(error, port));
        Server.on('listening', this.onListening.bind(Server, port));
    }
}

export default new Events();
