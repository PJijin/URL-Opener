import { Metadata } from 'next';
import AppLayout from './AppLayout';

export const metadata: Metadata = {
	title: 'URLOpener - Advanced URL Opener for hackers ',
	description: 'Advanced URL Opener for hackers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
