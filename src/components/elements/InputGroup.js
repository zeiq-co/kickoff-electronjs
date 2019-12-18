import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const InputGroup = ({ label, error, ...props }) => {
  return (
    <Container className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className={`input ${error ? 'is-danger' : ''}`}
          type="text"
          {...props}
        />
      </div>
    </Container>
  );
};

export default InputGroup;
