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

import React from 'react';
import { Line, Icon } from '../src/card';
import Textbox from './Textbox';
import styles from './CardLine.module.css';
import Button from './Button';

interface Props {
    line: Line
    updateName: (name: string) => void
    remove: () => void
    updateIcon: (icon: Icon) => void
}

const nameToValue = Object.freeze({
    None: undefined,
    Pronouns: 'pronouns',
    Location: 'location',
    Star: 'star',
    'Sad face': 'sadface',
});

const valueToName = Object.freeze({
    undefined: 'None',
    pronouns: 'Pronouns',
    location: 'Location',
    star: 'Star',
    'sadface': 'Sad face',
});

// TODO: Allow re-ordering
const CardLine: React.FC<Props> = (props) => {
    return <div className={styles.cardline}>
        <select value={valueToName[props.line.icon || 'undefined']} className={styles.dropdown}
                onChange={(e) => props.updateIcon(nameToValue[e.target.value])}>
            <option>None</option>
            <option>Pronouns</option>
            <option>Location</option>
            <option>Star</option>
            <option>Sad face</option>
        </select>
        <Textbox placeholder="Write an interesting thought..." value={props.line.text} style={{width: '75%'}} onChange={(e) => props.updateName(e.target.value)} />
        <Button className={styles['del-button']} onClick={() => props.remove()}>&#10799;</Button>
    </div>
}

export default CardLine;
