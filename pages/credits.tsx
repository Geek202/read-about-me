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

import Head from "next/head";
import React from "react";
import BackHome from "../components/BackHome";
import Footer from "../components/Footer";
import styles from '../styles/Home.module.css';

export default function Credits() {
    return <div className={styles.container}>
        <Head>
            <title>READ-about-ME.md - third-party credits</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}><BackHome />Third-Party credits</h1>

            <p className={styles.description}>
                Awesome things that make this website tick
            </p>

            <div className={styles.grid}>
                <a href="https://nextjs.org" className={styles.card}>
                    <h3>next.js &rarr;</h3>
                    <p>Server-Side rendering for reactjs</p>
                </a>

                <a href="https://www.typescriptlang.org" className={styles.card}>
                    <h3>TypeScript &rarr;</h3>
                    <p>Statically typed JavaScript</p>
                </a>

                <a href="https://github.com/iamhosseindhv/notistack" className={styles.card}>
                    <h3>notistack &rarr;</h3>
                    <p>Nice little toasts</p>
                </a>

                <div className={styles.card}>
                    <h3>Others</h3>
                    <p><a href="https://npmjs.org/next-absolute-url">next-absolute-url &rarr;</a></p>
                    <p><a href="https://npmjs.org/react-copy-to-clipboard">react-copy-to-clipboard &rarr;</a></p>
                </div>
            </div>
        </main>

        <Footer />
    </div>
}
