import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "./components/Card";
import { Search } from "./components/Search";
import { Loader } from "./components/Loader";

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CardsLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 5rem;
  gap: 5rem;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-height: 20rem;
`;

const apiUrl = new URL("https://api.elderscrollslegends.io/v1/cards");

function App() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(
    new URLSearchParams(window.location.search).get("search") ?? ""
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const [fetching, setFetching] = useState(false);

  useEffect(() =>
    window.addEventListener("scroll", () => setScrollPosition(window.scrollY))
  );

  useEffect(() => {
    const params = {
      page,
      pageSize: 20,
    };

    if (search) {
      params.name = search;
    }

    apiUrl.search = new URLSearchParams(params);

    if (
      !fetching &&
      hasMore &&
      window.document.body.scrollHeight -
        (scrollPosition + window.innerHeight) <
        200
    ) {
      setFetching(true);
      fetch(apiUrl)
        .then((response) => response.json())
        .then(({ cards: newCards }) => {
          if (newCards.length < 20) {
            setHasMore(false);
          }
          setCards((cards) => cards.concat(newCards));
          setPage((page) => page + 1);
          setFetching(false);
        });
    }
  }, [search, page, hasMore, scrollPosition, fetching]);

  const handleSearch = useCallback((text) => {
    setSearch(text);
    setPage(1);
    setHasMore(true);
    setCards([]);

    // Update the URL. Refresh will maintain current search and can be bookmarked!
    const updatedSearch = new URL(window.location.origin);
    updatedSearch.search = text ? new URLSearchParams({ search: text }) : null;
    window.history.replaceState(null, "", updatedSearch);
  }, []);

  return (
    <StyledApp>
      <Search text={search} onSearch={handleSearch} />
      <CardsLayout>
        {cards.map((card) => {
          const { imageUrl, name, text, set, type } = card;
          return (
            <Card
              key={card.name}
              imageUrl={imageUrl}
              name={name}
              text={text}
              setName={set?.name}
              type={type}
            />
          );
        })}
      </CardsLayout>
      {fetching && (
        <SpinnerContainer>
          <Loader />
        </SpinnerContainer>
      )}
    </StyledApp>
  );
}

export default App;
