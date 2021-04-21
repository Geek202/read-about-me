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

import styles from '../styles/Home.module.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';
import { useSnackbar } from 'notistack';

interface Props {
    data: string
    title: string
}

const CopyBox: React.FC<Props> = (props) => {
    const {enqueueSnackbar} = useSnackbar();

    return <div className={styles.card} style={{ maxWidth: '50vw' }}>
        <h3 className={styles['center-text']}>{props.title}</h3>
        <code className={styles.code}>{props.data}</code>
        <CopyToClipboard text={props.data} onCopy={() => enqueueSnackbar('Copied to clipboard!')}>
            <button className={styles.button}>Copy</button>
        </CopyToClipboard>
    </div>
}

export default CopyBox;
