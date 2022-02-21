import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm";
import { HeroCard } from '../hero/HeroCard'
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { useMemo } from "react";


export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { q = '' } = queryString.parse(location.search);

  

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues
  const heroesFilter = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${ searchText }`)
  }
  
  
  return (
    <>
      <h1>Search</h1>
        <hr />
        <div className="row">
          <div className="col-5">
            
            <form onSubmit={handleSearch}>
              <input
              type="text"
              placeholder="Search a Hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
              />

              <button
                className="btn btn-outline-primary mt-2"
                type="submit"
              >
                Search...
              </button>
            </form>
          </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {
            (q === '')
              ? <div className="alert alert-info">Search a Hero</div>
              : (heroesFilter.length === 0) 
                && <div className="alert alert-danger">There aren't result: { q }</div> 
          }
          {
            heroesFilter.map(hero => (
              <HeroCard
                key={hero.id}
                {...hero}
              />
            ))
          }
          </div>
        </div>
      </>
    )
  }