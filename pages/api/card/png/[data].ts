import Canvg, { presets } from "canvg";
import { NextApiRequest, NextApiResponse } from "next"
import { b64url_decode } from "../../../../src/b64";
import generate_card, { CardProperties } from "../../../../src/card/index";
import { cors } from "../../../../src/cors";
import { DOMParser } from 'xmldom';
import * as canvas from 'canvas';

const preset = presets.node({
    DOMParser,
    canvas,
    fetch,
});

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
    const canvas = preset.createCanvas(495, height);
    const ctx = canvas.getContext('2d');
    const v = Canvg.fromString(ctx, card_svg, preset);
    await v.render();
    res.send(canvas.toBuffer());
}
