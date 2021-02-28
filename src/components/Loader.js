import { memo } from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  border: 16px solid #36495a;
  border-radius: 50%;
  border-top: 16px solid #252525;
  width: 10rem;
  height: 10rem;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = memo(() => {
  return <StyledLoader />;
});
