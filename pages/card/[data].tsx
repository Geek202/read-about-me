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

import Footer from '../../components/Footer';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import { b64url_decode } from '../../src/b64';
import { CardProperties } from '../../src/card';
import { useMemo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function TestCard({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    function decode(): CardProperties {
        if (typeof window !== 'undefined') {
            return JSON.parse(atob(data)) as CardProperties;
        } else {
            return b64url_decode(data) as CardProperties;
        }
    }

    const card = useMemo(() => {
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
            card = decode();
        } catch (e) { console.log(e) }
        return card;
    }, []);

    const desc = useMemo(() => {
        return `See ${card.name}'s card!`
    }, [card]);

    return <div className={styles.container}>
        <Head>
            <title>Card</title>
            
            <meta property="og:title" content={card.name} />
            <meta name="twitter:title" content={card.name} />

            <meta property="og:description" content={desc} />
            <meta name="description" content={desc} />
            <meta property="twitter:description" content={desc} />
        </Head>

        <main className={styles.main}>
            <object className={styles['user-card']} data={"/api/card/" + data} />
        </main>

        <Footer />
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            data: context.query.data as string
        }
    }
}
