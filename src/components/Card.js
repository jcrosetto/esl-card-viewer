import MuiCard from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
import { memo } from "react";
import styled from "styled-components";
import { Entry } from "./Card/Text/Entry";

const StyledCard = styled(MuiCard)`
  border: 1rem solid gold;
  width: 20rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
`;

const StyledImage = styled(CardMedia)`
  width: 20rem;
  height: 30rem;
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
