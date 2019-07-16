import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Head from '../components/head';
import Nav from '../components/nav';
import Sidebar from '../components/Sidebar';
import withApolloClient from '../lib/with-apollo-client';
import '../assets/scss/black-dashboard-pro-react.scss';
import '../assets/demo/demo.css';
import '../assets/css/nucleo-icons.css';
import 'emoji-mart/css/emoji-mart.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <div className="wrapper">
            <div className="main-panel" data="green">
              <div className="content">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
