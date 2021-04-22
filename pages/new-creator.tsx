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

import React, { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import styles from '../styles/Creator.module.css';
import generate_card, { CardProperties, Icon, Line } from '../src/card/index';
import _getAbsoluteUrl from 'next-absolute-url';
import BackHome from '../components/BackHome';
import CopyBox from '../components/CopyBox';
import Head from 'next/head';
import Textbox from '../components/Textbox';
import Card from '../components/Card';
import CardLine from '../components/CardLine';
import Button from '../components/Button';

export default function NewCreator() {
    const [name, setName] = useState("");
    const [lines, setLines] = useState<(Line & { id: string })[]>([]);

    function addLine() {
        const newLines = lines.slice();
        newLines.push({
            id: new Date().getTime().toString(),
            text: '',
        });
        setLines(newLines);
    }

    function updateLine(id: string, text: string) {
        const newLines = lines.slice().map((line) => {
            const newLine = { ...line };
            if (newLine.id === id) {
                newLine.text = text;
            }
            console.log(newLine.id === id, newLine);
            return newLine;
        });
        setLines(newLines);
    }

    function updateIcon(id: string, icon: Icon) {
        const newLines = lines.slice().map((line) => {
            const newLine = { ...line };
            if (newLine.id === id) {
                newLine.icon = icon;
            }
            console.log(newLine.id === id, newLine);
            return newLine;
        });
        setLines(newLines);
    }

    function removeLine(id: string) {
        const newLines: (Line & { id: string })[] = [];
        for (let line of lines) {
            if (line.id !== id) {
                newLines.push({...line});
            }
        }
        setLines(newLines);
    }

    const card = useMemo(() => {
        return {
            name: name,
            lines: lines,
        } as CardProperties;
    }, [name, lines]);

    const generated_data = useMemo(() => {
        try {
            const b64 = btoa(JSON.stringify(card));
            return b64;
        } catch (e) {
            return '';
        }
    }, [card]);

    function getAbsoluteUrl(): string {
        if (typeof window !== 'undefined') {
            return _getAbsoluteUrl().origin;
        } else {
            return "";
        }
    }

    return <div className={styles.container}>
        <Head>
            <title>Card Creator</title>
        </Head>
        <h1><BackHome /> Card creator</h1>
        <main className={styles.main}>

            <div className={styles.layout}>
                <div className={styles.column}>
                    <div className={styles.grid}>
                        <Card style={{width: '50vw'}}>
                            <h3>Title</h3>
                            <Textbox value={name} placeholder="Enter your amazing name, or a cool title..." onChange={(e) => setName(e.target.value)} />
                        </Card>

                        <Card style={{width: '50vw'}}>
                            <h3>Content</h3>

                            {lines.map(line => <CardLine key={line.id} line={line}
                                updateName={(newName) => updateLine(line.id, newName)}
                                remove={() => removeLine(line.id)}
                                updateIcon={(newIcon) => updateIcon(line.id, newIcon)}
                                />)}

                            <br />

                            <Button onClick={() => addLine()} style={{width: '32px', height: '32px', fontSize: '24px', float: 'right', padding: 0}}>+</Button>

                            {/* this makes the formatting of the bottom of the box not completely scuffed */}
                            <br />
                        </Card>
                    </div>
                </div>
                <div className={styles.column}>
                    <h3>Preview</h3>
                    <div dangerouslySetInnerHTML={{ __html: generate_card(card, false, styles['user-card']) }} />

                    <br />

                    <Card hoverEffect={true}>
                        <CopyBox title="Image" data={`${getAbsoluteUrl()}/api/card/${generated_data}`} />
                    </Card>
                    <Card hoverEffect={true}>
                        <CopyBox title="Webpage" data={`${getAbsoluteUrl()}/card/${generated_data}`} />
                    </Card>
                    <Card hoverEffect={true}>
                        <CopyBox title="Markdown" data={`![${name}](${getAbsoluteUrl()}/api/card/${generated_data})`} />
                    </Card>
                </div>
            </div>
        </main>
        <Footer />
    </div>
}
