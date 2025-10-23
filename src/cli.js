#!/usr/bin/env node
import minimist from 'minimist';
import {createApp} from './server.js';
import {resolve} from 'node:path';

const argv = minimist(process.argv.slice(2), {
    string: ['db', 'port', 'host'],
    default: {
        db: resolve(process.cwd(), 'db.json'),
        port: '3000',
        host: '0.0.0.0'
    }
});

if (argv.help || argv.h) {
    console.log(`
json-db-serve

Usage:
  json-db-serve --db ./db.json --port 3000 --host 0.0.0.0

Flags:
  --db <path>      Path to db.json (default: ./db.json)
  --port <number>  Port (default: 3000)
  --host <host>    Host (default: 0.0.0.0)
  -h, --help       Show help
`);
    process.exit(0);
}

const app = createApp(argv.db);
app.listen(Number(argv.port), String(argv.host), () => {
    console.log(`json-db-serve running on http://${argv.host}:${argv.port}`);
    console.log(`DB: ${argv.db}`);
});
