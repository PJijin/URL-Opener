import React, { useState } from 'react';
import { onlyUnique } from '../libs/helpers';

const ParamAdder = ({ setUrls }) => {
	const [urlFuzz, setUrlFuzz] = useState('');
	const [payload, setPayload] = useState('');

	const generateUrlList = () => {
		const result = [];

		payload
			.split('\n')
			.filter(onlyUnique)
			.map(dt => {
				const fuzzUrl = dt + urlFuzz;
				result.push(fuzzUrl);
			});

		setUrls(result.join('\n'));
	};

	return (
		<div className="mt-1">
			<textarea placeholder="URL List" value={payload} onChange={e => setPayload(e.target.value)}></textarea>

			<input
				className="urlFuzzInput"
				type="url"
				value={urlFuzz}
				onBlur={generateUrlList}
				onChange={e => setUrlFuzz(e.target.value)}
				placeholder="Parameter To Add"
			/>
		</div>
	);
};

export default ParamAdder;
