import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ErrorText from './ErrorText';
import Input from './Input';
import InputTitle from './InputTitle';


const FormField = styled((props) => {
  return (
    // Use ref from react-hook-form
    <div className={props.className}>
      <InputTitle> {props.title} </InputTitle>
      {props.errors && props.errors.type === 'required' && <ErrorText>This field is required</ErrorText>}
      <Input ref={props.register} {...props} />
    </div>
  );
})`
  width: 100%;
  padding: 16px 0px;
  border-bottom: ${ props =>
    !props.noBorder && '1px solid' + props.theme.border
  };
`;

FormField.propTypes = {
  noBorder: PropTypes.bool
};

export default FormField;