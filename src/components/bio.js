/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile Picture"
      />
      {author?.name && (
        <p>
          From <a href="/about">{author.name}</a>
          {` `}
          {author.summary}
        </p>
      )}
      <div className="contact" align="right">
        <a href="../rss.xml">
          <StaticImage
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/rss.png"
            width={30}
            height={30}
            quality={95}
            alt="RSS"
          />
        </a>

        <a href="mailto://admin@parityncsvt.top">Email</a>
      </div>
    </div>
  )
}

export default Bio
