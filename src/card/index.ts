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

import { ACCENT, BACKGROUND } from "./constants";
import icons from "./icons";
import { create_styles } from "./style";

export type Icon = 'pronouns' | 'location' | 'star' | 'sadface';

export interface Line {
    icon?: Icon,
    text: string,
}

export interface CardProperties {
    name: string,
    lines: Line[],

    height?: number,
}

export default function generate_card(props: CardProperties, animated: boolean = true, add_class: string = "", get_height: ((height: number) => void) = () => { }): string {
    // const height = props.height || 215;
    const height = 64 + (props.lines.length * 32);
    get_height(height);

    return `<svg class="${add_class}" width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <style>
${create_styles(props.lines.length, animated)}
    </style>
    <rect width="495" height="${height}" rx="8" ry="8" style="fill:${BACKGROUND};" />
    <text x="24" y="36" fill="white" class="card-title" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif" font-size="24">${props.name}</text>
    
    ${generate_lines(props.lines)}
</svg>`
}

function generate_lines(lines: Line[]): string {
    let ret = "";
    for (let i = 0; i < lines.length; i++) {
        ret += generate_line(i, lines[i]);
        ret += "\n";
    }
    return ret;
}

function generate_line(i: number, line: Line): string {
    const y = 72 + (32 * i);
    const icon = create_icon_group(line.icon, y, i);
    let x = 54;
    if (line.icon === undefined) {
        x = 24;
    }
    return `${icon}<text x="${x}" y="${y}" fill="#eee" class="line-${i}" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', Sans-Serif" font-size="18">${line.text}</text>`
}

function create_icon_group(icon: Icon, y: number, i: number): string {
    return `<g class="line-${i}" transform="translate(24,${y - 18})" fill="${ACCENT}">
    ${icons[icon]}
</g>`
}
