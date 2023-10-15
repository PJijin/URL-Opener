'use client';

import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';
import '../styles/global.css';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Theme appearance="dark">
			{children}
			<Toaster position="top-center" theme="dark" />
		</Theme>
	);
};

export default AppLayout;
