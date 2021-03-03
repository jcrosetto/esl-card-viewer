import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { useRef } from "react";

const StyledSearch = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  position: fixed;
  > input {
    height: 2rem;
    max-width: 30rem;
    transition: width 1s;
    width: 0;
    ${(props) => props.showSearch && "width: calc(100vw - 82px);"}
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  && {
    width: 2.5rem;
    height: 2.5rem;
    color: white;
  }
`;

export const Search = memo(function Search(props) {
  const { text, onSearch } = props;

  const [showSearch, setShowSearch] = useState(!!text);
  const inputRef = useRef();

  const handleSearch = useCallback((event) => onSearch(event.target.value), [
    onSearch,
  ]);

  const handleHover = useCallback(() => {
    if (!text?.length) {
      setShowSearch(true);
    }
    inputRef.current.focus();
  }, [text]);

  const handleBlur = useCallback(() => {
    if (!text?.length) {
      setShowSearch(false);
    }
  }, [text]);

  return (
    <StyledSearch
      showSearch={showSearch}
      onMouseOver={handleHover}
      onMouseDown={(e) => e.preventDefault()}
      onBlur={handleBlur}
      onFocus={handleHover}
    >
      <StyledSearchIcon />
      <input
        value={text}
        onInput={handleSearch}
        placeholder="Enter a card name"
        ref={inputRef}
      />
    </StyledSearch>
  );
});

Search.propTypes = {
  text: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};
