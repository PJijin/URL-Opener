import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { notify } from 'react-notify-toast';

import {
	subdomainCleaner,
	makeUniqueLinks,
	filterResults,
	linkExtractor,
	arrayToNewLine,
	newLineToArray
} from '../libs/helpers';
import URLFuzz from '../components/url-fuzz';
import ParamAdder from '../components/param-adder';

import Layout from '../components/Layout';
import { globalStyles } from '../styles';

const INITIAL_OPTIONS = {
	urlFuzz: false,
	paramAdder: false
};

const Home = () => {
	const [urlList, setUrlsList] = useState('');
	const [urlLog, setUrlLog] = useState('');
	const [config, setConfig] = useState(INITIAL_OPTIONS);

	const [filterBy, setFilterBy] = useState('');

	const [linkFilter, setLinkFilter] = useState('');
	const [openCount, setOpenCount] = useState(10);

	useHotkeys('ctrl+r', () => openAllUrls(null));

	const updateConfig = name =>
		setConfig({
			...{ ...Object.keys(config).reduce((reduced, key) => ({ ...reduced, [key]: false }), {}) },
			[name]: config[name] === 'on' || config[name] === true ? false : true
		});

	const extrackLinks = () => {
		if (!urlList) notify.show('No valid URL List found', 'error');
		else {
			const output = linkExtractor(urlList);
			setUrlsList(output);
		}
	};

	const applyFilters = () => {
		if (linkFilter) {
			if (!urlList) notify.show('No valid URL List found', 'error');
			else {
				setUrlsList(filterResults(urlList, filterBy, linkFilter));
				notify.show('Filtered Results', 'success');
			}
		}
	};

	const cleanSubdomains = () => {
		if (!urlList) notify.show('No valid URL List found', 'error');
		else {
			setUrlsList(subdomainCleaner(urlList));
			notify.show('Subdomain Cleaned', 'success');
		}
	};

	const makeLinksUnique = () => {
		if (!urlList) notify.show('No valid URL List found', 'error');
		else {
			setUrlsList(makeUniqueLinks(urlList));
			notify.show('Sorted By Unique Links', 'success');
		}
	};

	const openAllUrls = e => {
		if (e) e.preventDefault();
		if (!urlList) notify.show("No Valid URL's entered", 'error');
		else {
			// extrackLinks();
			let urlOpened = 0;
			const urlVisited = [];
			const urlListArray = newLineToArray(urlList);

			urlListArray.map(url => {
				if (openCount > urlOpened) {
					urlOpened++;
					urlVisited.push(url);
					window.open(linkExtractor(url));
				}
			});

			const newUrlList = arrayToNewLine(urlListArray.splice(openCount, urlListArray.length));
			setUrlsList(newUrlList);

			const urlLogExisting = newLineToArray(urlLog);
			const logData = arrayToNewLine([...urlVisited, ...urlLogExisting]);

			setUrlLog(logData);
		}
	};

	return (
		<Layout>
			<main>
				<div className="tab">
					<span onClick={() => updateConfig('urlFuzz')} className={config.urlFuzz ? 'active' : ''}>
						Fuzz URL{' '}
					</span>
					<span onClick={() => updateConfig('paramAdder')} className={config.paramAdder ? 'active' : ''}>
						Param Adder{' '}
					</span>
				</div>

				{config.urlFuzz && <URLFuzz setUrls={setUrlsList} />}
				{config.paramAdder && <ParamAdder setUrls={setUrlsList} />}

				<div className="content-area">
					<textarea
						className="linksEditor"
						onChange={e => setUrlsList(e.target.value)}
						placeholder="Paste Text / Links"
						value={urlList}
					></textarea>
					<div className="f-sb">
						<div className="options">
							<select onChange={e => setFilterBy(e.target.value)}>
								<option value={true}>Includes</option>
								<option value={false}>Not Includes</option>
							</select>
							<input
								type="text"
								className="filterLinks"
								onChange={e => setLinkFilter(e.target.value)}
								value={linkFilter}
								placeholder="Filter Links"
								onBlur={applyFilters}
							/>

							<input
								type="number"
								onChange={e => setOpenCount(e.target.value)}
								value={openCount}
								placeholder="Limit URL"
							/>
							<span onClick={extrackLinks}>Extrack Links</span>
							<span onClick={makeLinksUnique}>Unique Links</span>
							<span onClick={cleanSubdomains}>Clean Subdomains</span>
							<CopyToClipboard text={urlList} onCopy={() => notify.show('Copied!', 'success')}>
								<span>Copy Links</span>
							</CopyToClipboard>
							<CopyToClipboard text={urlLog} onCopy={() => notify.show('Copied!', 'success')}>
								<span>Copy Logs</span>
							</CopyToClipboard>
							<span
								onClick={() => {
									setUrlsList('');
									setUrlLog('');
								}}
							>
								Clear Links
							</span>
						</div>
						<div>
							<span className="urllist-count">
								URL Count: {urlLog !== '' && urlLog.split('\n').filter(a => a != '').length + ' / '}
								{urlList === '' ? 0 : urlList.split('\n').filter(a => a != '').length}
							</span>
							<button onClick={openAllUrls}>
								Open URL's <span className="shortcut">(Ctrl + R)</span>
							</button>
						</div>
					</div>
					<textarea
						className="logEditor"
						placeholder="URL Log"
						onChange={e => setUrlLog(e.target.value)}
						value={urlLog}
					></textarea>
				</div>
			</main>
			<style jsx global>
				{globalStyles}
			</style>
		</Layout>
	);
};

export default Home;
