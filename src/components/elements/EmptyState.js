import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.div`
  font-size: 4rem !important;
  margin-bottom: 1rem;
`;

const EmptyState = ({ title, details, icon }) => (
  <div>
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <Icon className="material-icons">{icon}</Icon>
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{details}</h2>
        </div>
      </div>
    </section>
  </div>
);

EmptyState.defaultProps = {
  icon: 'data_usage',
  title: 'No data available',
  details: 'Why not create some?',
};

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  details: PropTypes.string,
};

export default EmptyState;
