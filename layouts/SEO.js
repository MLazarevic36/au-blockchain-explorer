import Head from "next/head"

const SEO = ({ title }) => {
	return (
		<Head>
			<title>{title}</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}

export default SEO
