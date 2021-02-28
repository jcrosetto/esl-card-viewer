import styled from "styled-components";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const StyledEntry = styled.div``;

const Label = styled(Typography)`
  && {
    font-weight: bold;
    padding-right: 0.3rem;
  }
`;

export function Entry(props) {
  const { label, text } = props;

  return (
    <StyledEntry>
      <Label display="inline">{label}:</Label>
      <Typography display="inline">{text}</Typography>
    </StyledEntry>
  );
}

Entry.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
