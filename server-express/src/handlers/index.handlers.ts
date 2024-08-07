import { Request, Response } from 'express';

export class IndexHandler {
    static getAll(req: Request<{ id: string }>, res: Response) {
        res.json([
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
            { id: 3, name: 'C' },
        ]);
    }
}
