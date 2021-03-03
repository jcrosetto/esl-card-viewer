import MuiCard from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
import { memo } from "react";
import styled from "styled-components";
import { Entry } from "./Card/Text/Entry";

const StyledCard = styled(MuiCard)`
  border: 0.5rem solid gold;
  width: 20rem;
  height: 40rem;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    .MuiTypography-body1 {
      /* TODO: This would ideally be done with theming */
      font-size: 0.9rem;
    }
  }
`;

const StyledImage = styled(CardMedia)`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  && {
    background-size: contain;
  }
`;

export const Card = memo(function Card(props) {
  const { imageUrl, name, text, setName, type } = props;

  return (
    <StyledCard>
      <StyledImage image={imageUrl} />
      <CardContent>
        <Entry key="name" label={"Name"} text={name} />
        {text && <Entry key="text" label={"Text"} text={text} />}
        <Entry key="set" label={"Set Name"} text={setName} />
        <Entry key="type" label={"Type"} text={type} />
      </CardContent>
    </StyledCard>
  );
});

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  setName: PropTypes.string,
  type: PropTypes.string,
};
