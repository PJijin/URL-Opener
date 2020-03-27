import css from 'styled-jsx/css';

export const globalStyles = css.global`
	::selection {
		background: #ff4081;
		color: #fff;
	}

	body {
		background: #000;
		color: #fff;
		padding: 1rem;
		font-family: 'Quicksand';
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	header div {
		flex: 1 1 45rem;
	}

	.tab {
		margin: 0.5rem;
		color: #465692;
	}

	.tab span {
		background: #3333334f;
		padding: 5px 0.5rem;
		border-radius: 0.4rem;
		font-size: 16px;
		color: #737373;
		margin-right: 10px;
		cursor: pointer;
		border-bottom: 2px solid #3333334f;
	}

	.tab .active {
		border-bottom: 2px solid #465692;
	}

	.mt-1 {
		margin-top: 1rem;
	}

	.description {
		color: #737373;
	}
	.f-sb {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
	}

	.urlFuzzInput {
		width: 100%;
	}

	.options {
		font-size: 12px;
	}
	.options input {
		margin-right: 10px;
	}
	.urllist-count {
		font-size: 12px;
		color: #b0b7d0;
		padding-right: 20px;
	}
	.shortcut {
		font-size: 10px;
		color: #b0b7d0;
	}
	.options span {
		margin: 0 10px;
		cursor: pointer;
		color: #737373;
	}
	.options span:hover {
		color: #fff;
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

	input,
	select {
		background: #333;
		font-size: 14px;
		color: #fff;
		padding: 0.5rem;
		border-radius: 0.4rem;
	}

	select {
		height: 34px;
		margin: 0 5px 0 0;
		z-index: 90;
		position: relative;
		border-radius: 0.5rem 0 0 0.5rem;
	}

	.logo-hat {
		position: absolute;
		transform: rotate(0);
	}

	.linksEditor {
		width: 100%;
		height: 50vh;
		background: #333;
		font-size: 14px;
		color: #fff;
		padding: 0.5rem;
		border-radius: 0.4rem;
		line-height: 1.2rem;
	}
	.logEditor,
	textarea {
		width: 100%;
		height: 13vh;
		background: #333;
		font-size: 14px;
		margin-top: 1rem;
		color: #ccc;
		padding: 0.5rem;
		border-radius: 0.4rem;
		line-height: 1.2rem;
	}

	select,
	textarea,
	input {
		border: 1px solid #333;
	}

	select:focus,
	textarea:focus,
	input:focus {
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
		background: #465692;
		padding: 1rem 2rem;
		border: thick double #000;
		border-radius: 0.4rem;
		font-weight: 500;
		cursor: pointer;
	}

	button:hover {
		background: #fff;
		color: #000;
	}

	@media only screen and (max-width: 1110px) {
		.f-sb {
			margin: 0.5rem 0;
		}
	}
	@media only screen and (max-width: 768px) {
		header {
			flex-wrap: wrap;
		}
		.social {
			margin: 0.5rem;
		}
		select {
			border-radius: 0.5rem;
		}
		.options span,
		input {
			margin: 0.2rem 0;
		}
		.options span {
			display: block;
		}
	}

	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #191c25;
	}

	::-webkit-scrollbar {
		width: 5px;
		background-color: #191c25;
	}

	::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #555;
	}
`;
