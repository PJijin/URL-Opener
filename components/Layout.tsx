import Head from 'next/head';

const Layout = ({ children }) => {
	return (
		<div className="p-5">
			<Head>
				<title>URL Opener</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet" />
			</Head>

			<main>
				<header>
					<div className="flex items-center space-x-2">
						<svg width="20" viewBox="0 0 36 36">
							<path
								fill="#31373D"
								d="M30.198 27.385L32 3.816a3.23 3.23 0 00-.021-.373c.003-.033.021-.075.021-.11C32 1.529 25.731.066 18 .066c-7.732 0-14 1.462-14 3.267 0 .035.017.068.022.102-.014.11-.022.23-.022.365l1.802 23.585C2.298 28.295 0 29.576 0 31c0 2.762 8.611 5 18 5s18-2.238 18-5c0-1.424-2.298-2.705-5.802-3.615z"
							></path>
							<path
								fill="#66757F"
								d="M17.536 6.595c-4.89 0-8.602-.896-10.852-1.646a1 1 0 11.632-1.898c2.889.963 10.762 2.891 21.421-.016a1 1 0 11.525 1.93c-4.406 1.202-8.347 1.63-11.726 1.63z"
							></path>
							<path
								fill="#744EAA"
								d="M30.198 27.385l.446-5.829c-7.705 2.157-17.585 2.207-25.316-.377l.393 5.142c.069.304.113.65.113 1.076 0 1.75 1.289 2.828 2.771 3.396 4.458 1.708 13.958 1.646 18.807.149 1.467-.453 2.776-1.733 2.776-3.191 0-.119.015-.241.024-.361l-.014-.005z"
							></path>
						</svg>
						<h1 className="title">URL Opener</h1>
						<p className="text-gray-500 text-sm">Advanced URL Opener for hackers </p>
					</div>

					<div className="social">
						Follow on{' '}
						<a target="_BLANK" href="https://twitter.com/PJijin">
							Twitter
						</a>
						<a target="_BLANK" href="https://github.com/PJijin/URL-Opener">
							Github
						</a>
					</div>
				</header>

				{children}
			</main>
		</div>
	);
};

export default Layout;
