'use client';

import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';

import {
	arrayToNewLine,
	filterResults,
	linkExtractor,
	makeUniqueLinks,
	newLineToArray,
	subdomainCleaner,
} from '../libs/helpers';

import { Badge, Button, Select, Text, TextArea, TextField } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Layout from '../components/Layout';
import ParamAdder from '../components/param-adder';
import URLFuzz from '../components/url-fuzz';
import { globalStyles } from '../styles';

const Home = () => {
	const [urlList, setUrlsList] = useState('');
	const [urlLog, setUrlLog] = useState('');

	const [filterBy, setFilterBy] = useState('true');

	const [linkFilter, setLinkFilter] = useState('');
	const [openCount, setOpenCount] = useState(10);

	useHotkeys('ctrl+r', () => openAllUrls(null));

	const extrackLinks = () => {
		if (!urlList) toast.error('No valid URL List found');
		else {
			const output = linkExtractor(urlList);
			setUrlsList(output);
		}
	};

	const applyFilters = () => {
		if (linkFilter) {
			if (!urlList) toast.error('No valid URL List found');
			else {
				console.log('filterBy');
				console.log(filterBy);
				setUrlsList(filterResults(urlList, filterBy == 'true' ? true : false, linkFilter));
				toast.success('Filtered Results');
			}
		}
	};

	const cleanSubdomains = () => {
		if (!urlList) toast.error('No valid URL List found');
		else {
			setUrlsList(subdomainCleaner(urlList));
			toast.success('Subdomain Cleaned');
		}
	};

	const makeLinksUnique = () => {
		if (!urlList) toast.error('No valid URL List found');
		else {
			setUrlsList(makeUniqueLinks(urlList));
			toast.success('Sorted By Unique Links');
		}
	};

	const openAllUrls = (e) => {
		if (e) e.preventDefault();
		if (!urlList) toast.error("No Valid URL's entered");
		else {
			// extrackLinks();
			let urlOpened = 0;
			const urlVisited = [];
			const urlListArray = newLineToArray(urlList);

			urlListArray.map((url) => {
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
				<div className="mt-8 mb-5 space-x-3">
					<URLFuzz setUrls={setUrlsList} />

					<ParamAdder setUrls={setUrlsList} />
				</div>

				<div className="content-area">
					<TextArea
						className="w-full"
						onChange={(e) => setUrlsList(e.target.value)}
						placeholder="Paste Text / Links"
						value={urlList}
						rows={20}
					/>
					<div className="w-full my-5">
						<div className="flex items-center space-x-5">
							<div>
								<Text color="gray" size="1">
									Filter by
								</Text>
								<Select.Root
									value={filterBy}
									onValueChange={(e) => {
										setFilterBy(e);
									}}
								>
									<Select.Trigger />
									<Select.Content>
										<Select.Group>
											<Select.Label>Filter</Select.Label>
											<Select.Item value="false">Includes</Select.Item>
											<Select.Item value="true">Not Includes</Select.Item>
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</div>

							<div>
								<Text color="gray" size="1">
									Filter String
								</Text>

								<TextField.Input
									type="text"
									className="filterLinks"
									onChange={(e) => setLinkFilter(e.target.value)}
									value={linkFilter}
									placeholder="Filter Links"
									onBlur={applyFilters}
								/>
							</div>
							<div>
								<Text color="gray" size="1">
									Limit URL
								</Text>
								<TextField.Input
									type="number"
									onChange={(e) => setOpenCount(Number(e.target.value))}
									value={openCount}
									className="w-2"
									placeholder="Limit URL"
								/>
							</div>
							<Button variant="ghost" size="2" onClick={extrackLinks}>
								Extrack Links
							</Button>
							<Button variant="ghost" size="2" onClick={makeLinksUnique}>
								Unique Links
							</Button>
							<Button variant="ghost" size="2" onClick={cleanSubdomains}>
								Clean Subdomains
							</Button>
							<CopyToClipboard text={urlList} onCopy={() => toast.success('Copied!')}>
								<Button variant="ghost" size="2">
									Copy Links
								</Button>
							</CopyToClipboard>
							<CopyToClipboard text={urlLog} onCopy={() => toast.success('Copied!')}>
								<Button variant="ghost" size="2">
									Copy Logs
								</Button>
							</CopyToClipboard>
							<Button
								variant="ghost"
								size="2"
								onClick={() => {
									setUrlsList('');
								}}
							>
								Clear Links
							</Button>

							<Button
								variant="ghost"
								onClick={() => {
									setUrlLog('');
								}}
							>
								Clear Logs
							</Button>
						</div>
						<div className="mt-5 flex items-center">
							<span className="urllist-count">
								{urlList === '' ? (
									<>
										Visited URL's: {'  '}
										<Badge>
											{urlLog !== '' ? urlLog.split('\n').filter((a) => a != '').length : 0}
										</Badge>
									</>
								) : (
									<>
										URL Count:{' '}
										<Badge>
											{urlLog !== '' && urlLog.split('\n').filter((a) => a != '').length + ' / '}
											{urlList.split('\n').filter((a) => a != '').length}
										</Badge>
									</>
								)}
							</span>
							<Button color="blue" size={'2'} onClick={openAllUrls}>
								Open URL's <span className="text-xs">(Ctrl + R)</span>
							</Button>
						</div>
					</div>
					<TextArea
						className="w-full"
						placeholder="URL Log"
						onChange={(e) => setUrlLog(e.target.value)}
						value={urlLog}
					/>
				</div>
			</main>
			<style jsx global>
				{globalStyles}
			</style>
		</Layout>
	);
};

export default Home;
