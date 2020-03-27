import React, { useState } from 'react';
import { onlyUnique } from '../libs/helpers';

const URLFuzz = ({ setUrls }) => {
	const [urlFuzz, setUrlFuzz] = useState('');
	const [payload, setPayload] = useState('');
	const [encode, setEncode] = useState(false);

	const generateUrlList = () => {
		const result = [];

		payload
			.split('\n')
			.filter(onlyUnique)
			.map(dt => {
				const fuzzUrl = urlFuzz.replace('[FUZZ]', encode ? encodeURI(dt) : dt);
				result.push(fuzzUrl);
			});

		setUrls(result.join('\n'));
	};

	return (
		<div className="tab-content">
			<input
				className="urlFuzzInput"
				type="url"
				value={urlFuzz}
				onChange={e => setUrlFuzz(e.target.value)}
				placeholder="URL with [FUZZ] keyword. (FUZZ will be replaced with the payload data)"
			/>
			<div className="check-option">
				<input
					type="checkbox"
					id="urlencode"
					name="encode"
					onChange={() => setEncode(!encode)}
					checked={encode && true}
				/>{' '}
				<label htmlFor="urlencode">URL Encode</label>
			</div>
			<textarea
				placeholder="Payloads (one per line)"
				onBlur={generateUrlList}
				value={payload}
				onChange={e => setPayload(e.target.value)}
			></textarea>
		</div>
	);
};

export default URLFuzz;
