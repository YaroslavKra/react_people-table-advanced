import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentCenturies = newParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      newParams.delete('centuries');

      currentCenturies
        .filter(item => item !== century)
        .forEach(item => newParams.append('centuries', item));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={sex === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => {
              const value = event.target.value;
              const search = getSearchWith(searchParams, {
                query: value || null,
              });

              setSearchParams(search);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${
                centuries.includes('16') ? 'is-info' : ''
              }`}
              onClick={() => toggleCentury('16')}
            >
              16
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${
                centuries.includes('17') ? 'is-info' : ''
              }`}
              onClick={() => toggleCentury('17')}
            >
              17
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${
                centuries.includes('18') ? 'is-info' : ''
              }`}
              onClick={() => toggleCentury('18')}
            >
              18
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${
                centuries.includes('19') ? 'is-info' : ''
              }`}
              onClick={() => toggleCentury('19')}
            >
              19
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${
                centuries.includes('20') ? 'is-info' : ''
              }`}
              onClick={() => toggleCentury('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                newParams.delete('centuries');

                setSearchParams(newParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
