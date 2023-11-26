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
                <p>其实是为了理解相关知识所以自己从头构建了一个 About 页面……我是一个怎么样的人呢？</p>
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
