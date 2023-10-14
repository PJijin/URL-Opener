import { fromUrl, parseDomain } from "parse-domain";


export const onlyUnique = (value, index, self) => {
	return self.indexOf(value) === index;
};

export const newLineToArray = urlList => urlList.split('\n');

export const arrayToNewLine = output => output.splice(',').join('\n');

export const makeUniqueLinks = urlList => {
	return urlList
		.split('\n')
		.filter(onlyUnique)
		.splice(',')
		.join('\n');
};

export const filterResults = (urlList, filterBy, linkFilter) => {
	const output = urlList.split('\n').filter(dt => (filterBy ? !dt.match(linkFilter) : dt.match(linkFilter)));
	return arrayToNewLine(output);
};

export const subdomainCleaner = urlList => {
	const cleanSubList = [];

	urlList.split('\n').map(it => {
		if (it) {
			const parseData = parseDomain(fromUrl(it));
			// @ts-ignore
			if (parseData && parseData.hostname) cleanSubList.push(`https://${String(parseData.topLevelDomains.join('.'))}`);
		}
	});

	return cleanSubList
		.filter(onlyUnique)
		// .splice(',')
		.join('\n');
};

export const linkExtractor = text => {
	if (text !== '') {
		var urlRegex = /(https?:\/\/[^\s]+)/g;
		let linkInText = '';
		text.replace(urlRegex, function (url) {
			linkInText = linkInText + '\n' + url;
			return url;
		});
		return linkInText.trim();
	}
};
