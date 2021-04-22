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

import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import NextLink from 'next/link'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>READ-about-ME.md</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to READ-about-ME.md
                </h1>

                <p className={styles.description}>
                    Check out what you can do below:
                </p>

                <div className={styles.grid}>
                    <NextLink href="/new-creator">
                        <a className={styles.card}>
                            <h3>Create a card &rarr;</h3>
                            <p>Make and personalize a card to share</p>
                        </a>
                    </NextLink>

                    <a href="about:blank" className={styles.card}>
                        <h3>Example &rarr;</h3>
                        <p>Check out the author's card as an example! (TODO)</p>
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    )
}
