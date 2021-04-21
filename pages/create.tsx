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

import { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import generate_card, { CardProperties } from '../src/card/index';
import _getAbsoluteUrl from 'next-absolute-url';
import BackHome from '../components/BackHome';
import CopyBox from '../components/CopyBox';

export default function Create() {
    const [name, setName] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [location, setLocation] = useState("");

    const card = useMemo(() => {
        const lines = [];
        const trimmed_desc = shortDesc.trim();
        const trimmed_pronouns = pronouns.trim();
        const trimmed_location = location.trim();
        if (trimmed_desc.length != 0) {
            lines.push({
                text: trimmed_desc,
            });
        }
        if (trimmed_pronouns.length != 0) {
            lines.push({
                text: trimmed_pronouns,
                icon: 'pronouns',
            });
        }
        if (trimmed_location.length != 0) {
            lines.push({
                text: trimmed_location,
                icon: 'location',
            });
        }

        return {
            name: name,
            lines,
        } as CardProperties;
    }, [name, shortDesc, pronouns, location]);

    // const router = useRouter();
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
        <h1><BackHome /> Card creator</h1>
        <main className={styles.main}>

            <div className={styles['creator-grid']}>
                <div className={styles['creator-grid-row']}>
                    <div className={styles.grid}>
                        <div className={styles['input-card']}>
                            <h3>Title</h3>
                            <input className={styles.textbox} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={styles['input-card']}>
                            <h3>Subtitle</h3>
                            <input className={styles.textbox} type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
                        </div>
                        <div className={styles['input-card']}>
                            <h3>Pronouns</h3>
                            <input className={styles.textbox} type="text" value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                        </div>
                        <div className={styles['input-card']}>
                            <h3>Location</h3>
                            <input className={styles.textbox} type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className={styles['creator-grid-row']}>
                    <h3>Preview</h3>
                    <div dangerouslySetInnerHTML={{ __html: generate_card(card, false, styles['user-card']) }} />

                    <br />
                </div>
            </div>

            <CopyBox title="Image" data={`${getAbsoluteUrl()}/api/card/${generated_data}`} />
            <CopyBox title="Webpage" data={`${getAbsoluteUrl()}/card/${generated_data}`} />
            <CopyBox title="Markdown" data={`![${name}](${getAbsoluteUrl()}/api/card/${generated_data})`} />
        </main>
        <Footer />
    </div>
}
