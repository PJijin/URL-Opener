import { AlertDialog, Button, Checkbox, Flex, TextArea, TextField } from '@radix-ui/themes';
import { useState } from 'react';
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
			.map((dt) => {
				const fuzzUrl = urlFuzz.replace('[FUZZ]', encode ? encodeURI(dt) : dt);
				result.push(fuzzUrl);
			});

		setUrls(result.join('\n'));
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="gray" variant="soft">
						URL Fuzz
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content style={{ maxWidth: 650 }}>
					<AlertDialog.Title>Fuzz URL</AlertDialog.Title>
					<AlertDialog.Description size="2">
						<div className="space-y-5">
							<TextArea
								rows={15}
								placeholder="Payloads (one per line)"
								onBlur={generateUrlList}
								value={payload}
								onChange={(e) => setPayload(e.target.value)}
							/>
							<TextField.Input
								className="urlFuzzInput"
								type="url"
								value={urlFuzz}
								onChange={(e) => setUrlFuzz(e.target.value)}
								placeholder="URL with [FUZZ] keyword. (FUZZ will be replaced with the payload data)"
							/>
							<div className="check-option">
								{encode}
								<Checkbox
									onClick={() => {
										setEncode(!encode);
									}}
									checked={encode}
								/>
								<label
									onClick={() => {
										setEncode(!encode);
									}}
									htmlFor="urlencode"
									className="ml-2"
								>
									URL Encode
								</label>
							</div>
						</div>
					</AlertDialog.Description>

					<Flex gap="3" mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant="solid" color="blue">
								Submit
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default URLFuzz;
