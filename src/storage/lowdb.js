import {Low} from 'lowdb';
import {JSONFile} from 'lowdb/node';

export class LowdbStorage {
    constructor(path) {
        this.path = path;
        const adapter = new JSONFile(path);
        this.db = new Low(adapter, {});
    }

    async read() {
        await this.db.read();
        this.db.data ||= {};
    }

    data() {
        return this.db.data;
    }

    async write() {
        await this.db.write();
    }
}
