import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import isOnline from 'is-online';
import { useStoreActions } from 'easy-peasy';

import config from '../utils/config';
import Seo from './Seo';

const Wrapper = styled.div`
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const Container = styled.div``;

const Layout = ({ children, title, description }) => {
  const setIsOnline = useStoreActions(actions => actions.device.setIsOnline);

  useEffect(() => {
    // check if network is connected
    (async () => {
      const isConnected = await isOnline();
      setIsOnline(isConnected);
    })();
  }, []);

  return (
    <Wrapper className="container is-fluid">
      <Seo title={title} description={description} />
      <Container>
        <div className="main-container">{children}</div>
      </Container>
    </Wrapper>
  );
};

Layout.defaultProps = {
  title: config.siteName,
  description: '',
};

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Layout;
