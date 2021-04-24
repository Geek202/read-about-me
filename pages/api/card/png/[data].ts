import { NextApiRequest, NextApiResponse } from "next"
import { b64url_decode } from "../../../../src/b64";
import generate_card, { CardProperties } from "../../../../src/card/index";
import { cors } from "../../../../src/cors";
import { convert } from 'imagemagick';
import { writeFileSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    const { data } = req.query;
    let card: CardProperties = {
        name: 'Failed to load',
        lines: [
            {
                text: 'The card failed to load',
                icon: 'sadface',
            }
        ]
    }
    try {
        card = b64url_decode(data as string);
    } catch (e) { }

    res.status(200);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=7200"); // Two hours
    let height: number;
    const card_svg = generate_card(card, false, '', (h) => height = h);
    const svg_buf = Buffer.from(card_svg);
    const starttime = Date.now();
    const buf: Buffer = await new Promise((resolve, reject) => {
        const time = new Date().getTime();
        const tmp = tmpdir();
        const input = path.join(tmp, `tmp-${time}.svg`);
        const output = path.join(tmp, `tmp-${time}.png`);
        writeFileSync(input, svg_buf);
        convert([input, output], (err, out) => {
            rmSync(input);
            if (err) {
                reject(err);
            } else {
                const result = readFileSync(output);
                rmSync(output);
                resolve(result);
            }
        });
    });
    res.setHeader('X-Compute-Time', Date.now() - starttime);
    
    res.send(buf);
}
