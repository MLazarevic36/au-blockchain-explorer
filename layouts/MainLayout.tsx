import Header from "./Header"
import { LayoutProps } from "./pageWithLayouts"

const MainLayout: LayoutProps = ({ children }) => {
	return (
		<div>
			<Header>{children}</Header>
		</div>
	)
}

export default MainLayout
