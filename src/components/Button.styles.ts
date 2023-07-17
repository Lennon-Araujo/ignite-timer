import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' |  'secondary' | 'warning'

interface ButtonContainerProps {
  variant?: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  warning: 'yellow'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 50px;
  border: 0;
  border-radius: 4px;
  margin: 8px;
  background-color: ${props => props.theme['green-500']};
  color: ${props => props.theme.white};
  
  /* ${props => {
     if (props.variant) {
       return css`
       background-color: ${buttonVariants[props.variant]}
       `
     }
  }} */
`;