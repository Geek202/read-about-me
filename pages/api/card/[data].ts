/**
 * Copyright (c) 2021 Tom_The_Geek
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { NextApiRequest, NextApiResponse } from "next"
import { b64url_decode } from "../../../src/b64";
import generate_card, { CardProperties } from "../../../src/card/index";
import { cors } from "../../../src/cors"

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
    res.setHeader("Content-Type", "image/svg+xml")
    res.send(generate_card(card));
}
