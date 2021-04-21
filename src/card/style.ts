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

import { ACCENT } from "./constants";


// TODO: Support custom styling
export function create_styles(lines: number, fade: boolean): string {
    return `text {
    font: 600 18px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
    ${(fade && "animation: fade-in 1s ease;") || ''}
    animation-fill-mode: both;
}

${(fade && generate_fades(lines)) || ''}

.card-title {
    font: 600 24px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
    text-transform: bold;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`;
}

function generate_fades(lines: number): string {
    let ret = "";
    for (let i = 0; i < lines; i++) {
        ret += `
.line-${i} {
    animation-delay: ${.25 + (.2 * i)}s;
}

.line-${i} > * {
    animation: fade-in 1s ease;
    animation-fill-mode: both;
    animation-delay: ${.25 + (.2 * i)}s;
    fill: ${ACCENT};
}
`
    }
    return ret;
}
