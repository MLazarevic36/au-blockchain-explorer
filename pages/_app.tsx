import PageWithLayoutType from "@/layouts/pageWithLayouts"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

type AppLayoutProps = AppProps & {
	Component: PageWithLayoutType
	pageProps: any
}

export default function App({ Component, pageProps }: AppLayoutProps) {
	const Layout = Component.layout || ((children: any) => <>{children}</>)

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
