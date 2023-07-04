import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Buttons from "./Buttons";

const BASE_URL = "http://gateway.marvel.com/v1/public/creators";
const API_KEY = "95857d6d985fa57f979a3eca57531d54";

function CreatorsList() {
  const [creators, setCreators] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState(null);

  const LIMIT = 48;

  async function fetchCreators(search, offset) {
    if (!search) {
      axios
        .get(BASE_URL, {
          params: {
            apikey: API_KEY,
            orderBy: "-modified",
            limit: LIMIT,
            offset: offset,
          },
        })
        .then(
          (response) => (
            setCreators(response.data.data.results),
            setTotal(response.data.data.total)
          )
        )
        .catch((error) => setError(error.message));
    } else if (search) {
      axios
        .get(BASE_URL, {
          params: {
            apikey: API_KEY,
            lastNameStartsWith: search,
            limit: LIMIT,
            offset: offset,
          },
        })
        .then(
          (response) => (
            fetchCreators(response.data.data.results),
            setTotal(response.data.data.total)
          )
        )
        .catch((error) => setError(error.message));
    }
  }

  useEffect(() => {
    fetchCreators();
  }, []);

  function handleChange() {
    console.log(search);
    fetchCreators(search, offset);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchCreators(search, offset);
  }

  function handlePrevClick() {
    setOffset(offset - LIMIT);
    fetchCreators(search, offset - LIMIT);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleNextClick() {
    setOffset(offset + LIMIT);
    fetchCreators(search, offset + LIMIT);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }

  if (error) {
    return (
      <div className="error">
        <h2 className="error-message">{error}</h2>
      </div>
    );
  } else if (creators) {
    console.log(search);
    console.log(creators);
    const CREATORS_ITEMS = creators.map((creator, index) => (
      <li className="creator-list-item" key={index}>
        <h3 className="creator-name">{creator.fullName}</h3>
        <p className="creator-info">
          Created {creator.comics.available} comics
        </p>
        <div className="creator-add-info">
          <Link to={"/creators/" + creator.id} className="creator-add-info-btn">
            More
          </Link>
        </div>
        <img
          className="creator-picture"
          src={creator.thumbnail.path + "." + creator.thumbnail.extension}
          alt={creator.fullName}
        />
      </li>
    ));
    const SEARCH_FORM = (
      <form
        className="creators-form"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <input
          className="creators-input"
          type="text"
          placeholder="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input className="creators-form-button" type="submit" value="Search" />
      </form>
    );
    return (
      <>
        {SEARCH_FORM}
        <ul className="creators-list">{CREATORS_ITEMS}</ul>
        <Buttons
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          offset={offset}
          limit={LIMIT}
          total={total}
        />
      </>
    );
  }
}

export default CreatorsList;
