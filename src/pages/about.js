import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const About = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    return(
        <Layout location={location} title={siteTitle}>
            <h1>About</h1>
            <Bio />
            <div>
                <p>To be edited.</p>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="About" />

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
