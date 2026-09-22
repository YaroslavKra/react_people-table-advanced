/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink/PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getRelative = (relativeName: string | null) => {
    if (!relativeName) {
      return null;
    }

    return people.find(person => person.name === relativeName);
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    let result = 0;

    if (sort === 'name') {
      result = a.name.localeCompare(b.name);
    }

    if (sort === 'sex') {
      result = a.sex.localeCompare(b.sex);
    }

    if (sort === 'born') {
      result = a.born - b.born;
    }

    if (sort === 'died') {
      result = a.died - b.died;
    }

    return order === 'desc' ? -result : result;
  });

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (sort === field && !order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <table data-cy="peopleTable" className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {getRelative(person.motherName) ? (
                <PersonLink person={getRelative(person.motherName)} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {getRelative(person.fatherName) ? (
                <PersonLink person={getRelative(person.fatherName)} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
