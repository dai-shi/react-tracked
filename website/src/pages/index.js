/* eslint import/no-unresolved: off */

import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import withBaseUrl from '@docusaurus/withBaseUrl';


import Layout from '@theme/Layout';

const Home = () => {
  const { siteConfig = {} } = useDocusaurusContext();

  return (
    <Layout
      permalink="/"
      description={siteConfig.tagline}
    >
      <div style={{
        textAlign: 'center',
        paddingTop: 40,
        paddingBottom: 40,
      }}
      >
        <img
          alt="React Tracked Logo"
          src={withBaseUrl('img/react-tracked-logo.svg')}
        />
        <h1>{siteConfig.title}</h1>
        <h6>{siteConfig.tagline}</h6>
        <div style={{
          fontSize: '2em',
        }}
        >
          <Link
            to={withBaseUrl('docs/introduction')}
          >
            Getting Started
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
