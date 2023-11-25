import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P8BK01ELC3"></script>
          <script>
           window.dataLayer = window.dataLayer || [];
           function gtag()&lbrace;dataLayer.push(arguments);&rbrace;
            gtag('js', new Date());

           gtag('config', 'G-P8BK01ELC3');
        </script>
      </div>
      <footer>
        Under CC BY-SA 4.0，by {new Date().getFullYear()} Parity Nonconservation. Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        and ❤.
      </footer>
    </div>
  )
}

export default Layout
