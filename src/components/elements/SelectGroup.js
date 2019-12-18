import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const SelectGroup = ({ label, placeholder, options, error, ...props }) => {
  return (
    <Container className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className={`select ${error ? 'is-danger' : ''}`}>
          <select {...props}>
            <option>{placeholder}...</option>
            {options &&
              options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>
      </div>
    </Container>
  );
};

export default SelectGroup;
