import { Theme } from '@radix-ui/themes';
import type { AppProps } from 'next/app';
import { Toaster } from 'sonner';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Theme appearance="dark">
			<Component {...pageProps} />
			<Toaster />
		</Theme>
	);
}
