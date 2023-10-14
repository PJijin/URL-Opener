import AppLayout from './AppLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
