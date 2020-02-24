import { useState } from 'react';
import Head from 'next/head';

const Home = () => {
	const [urlList, setUrlsList] = useState();

	const openAllUrls = e => {
		e.preventDefault();
		urlList.split('\n').map(url => {
			window.open(url);
		});
	};

	return (
		<div className="container">
			<Head>
				<title>URL Opener</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet" />
			</Head>

			<main>
				<header>
					<div>
						<h1 className="title">URL Opener</h1>
						<p className="description">Open all URL's on one click (one url per line)</p>
					</div>
					<div className="social">
						Follow on{' '}
						<a target="_BLANK" href="https://twitter.com/PJijin">
							Twitter
						</a>
						<a target="_BLANK" href="https://github.com/PJijin">
							Github
						</a>
					</div>
				</header>

				<div className="content-area">
					<textarea onChange={e => setUrlsList(e.target.value)}>{urlList}</textarea>
					<button onClick={openAllUrls}>Open All</button>
				</div>
			</main>
			<style jsx global>{`
				body {
					background: #000;
					color: #fff;
					padding: 1rem;
					font-family: 'Quicksand';
				}

				header {
					display: flex;
					justift-content: space-between;
				}
				header div {
					flex: 1 1 45rem;
				}

				.social {
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
				.social a {
					color: #737373;
					padding: 0 0.4rem;
					text-decoration: none;
				}

				.container {
					background: #000;
				}

				h1 {
					font-size: 1.5rem;
					color: #fff;
				}

				textarea {
					width: 100%;
					height: 50vh;
					background: #333;
					border: 0px;
					font-size: 14px;
					color: #fff;
					padding: 0.5rem;
					border-radius: 0.4rem;
					line-height: 1.2rem;
				}

				textarea:focus {
					outline: none !important;
					border: 1px solid #008000;
					box-shadow: 0 0 10px #008000;
				}

				.content-area {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}

				button {
					border: 1px double #008000;
					margin-top: 1rem;
					color: #fff;
					background: transparent;
					padding: 1rem;
					border-radius: 0.4rem;
					cursor: pointer;
				}

				button:hover {
					border: thick double #008000;
				}
			`}</style>
		</div>
	);
};

export default Home;
