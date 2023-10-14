'use client';

import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';
import '../styles/global.css';

const AppLayout = ({ children }) => {
	return (
		<Theme appearance="dark">
			{children}
			<Toaster />
		</Theme>
	);
};

export default AppLayout;
