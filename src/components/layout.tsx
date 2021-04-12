/*
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Header from './header';
import './layout.css';
import { Box, Container } from '@material-ui/core';

const Layout = ({ children }: { children: any }) => {

  const data = useStaticQuery(graphql`
      query SiteTitleQuery {
          site {
              siteMetadata {
                  title
              }
          }
      }
  `);

  return (
    <Box>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>
        <Container fluid>
          {children}
        </Container>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {' '}
        <a href='https://www.gatsbyjs.org'>Gatsby</a>
        {' '}
        by
        {' '}
        <a href='https://www.evaluates2.com'>Evaluates2</a>
        .
      </footer>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
