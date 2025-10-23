import {Router} from 'express';

export function buildRouter(storage) {
    const r = Router();

    r.get('/:col', async (req, res) => {
        await storage.read();
        res.json(storage.data()[req.params.col] || []);
    });

    r.get('/:col/:id', async (req, res) => {
        await storage.read();
        const {col, id} = req.params;
        const list = storage.data()[col] || [];
        const item = list.find(x => String(x.id) === String(id));
        if (!item) return res.status(404).json({error: 'Not found'});
        res.json(item);
    });

    r.post('/:col', async (req, res) => {
        await storage.read();
        const col = req.params.col;
        const body = req.body || {};
        storage.data()[col] ||= [];
        body.id ??= Date.now();
        storage.data()[col].push(body);
        await storage.write();
        res.status(201).json(body);
    });

    r.patch('/:col/:id', async (req, res) => {
        await storage.read();
        const {col, id} = req.params;
        const list = storage.data()[col] || [];
        const idx = list.findIndex(x => String(x.id) === String(id));
        if (idx === -1) return res.status(404).json({error: 'Not found'});
        Object.assign(list[idx], req.body || {});
        await storage.write();
        res.json(list[idx]);
    });

    r.delete('/:col/:id', async (req, res) => {
        await storage.read();
        const {col, id} = req.params;
        const list = storage.data()[col] || [];
        const idx = list.findIndex(x => String(x.id) === String(id));
        if (idx === -1) return res.status(404).json({error: 'Not found'});
        const [removed] = list.splice(idx, 1);
        await storage.write();
        res.json(removed);
    });

    return r;
}
