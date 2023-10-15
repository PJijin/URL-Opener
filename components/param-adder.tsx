import { AlertDialog, Button, Flex, TextArea, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { onlyUnique } from '../libs/helpers';

const ParamAdder = ({ setUrls }: { setUrls: React.Dispatch<React.SetStateAction<string>> }) => {
	const [urlFuzz, setUrlFuzz] = useState('');
	const [payload, setPayload] = useState('');

	const generateUrlList = () => {
		const result: string[] = [];

		payload
			.split('\n')
			.filter(onlyUnique)
			.map((dt) => {
				const fuzzUrl = dt + urlFuzz;
				result.push(fuzzUrl);
			});

		setUrls(result.join('\n'));
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="gray" variant="soft">
						URL Params
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content style={{ maxWidth: 650 }}>
					<AlertDialog.Title>URL Params</AlertDialog.Title>
					<AlertDialog.Description size="2">
						<div className="space-y-5">
							<TextArea
								placeholder="URL List"
								rows={15}
								value={payload}
								onChange={(e) => setPayload(e.target.value)}
							/>

							<TextField.Input
								type="text"
								value={urlFuzz}
								onBlur={generateUrlList}
								onChange={(e) => setUrlFuzz(e.target.value)}
								placeholder="Parameter To Add"
							/>
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

export default ParamAdder;
