import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const searchParams = useSearchParams()[0];
  const [loading, setLoading] = useState(true);
  const [HasError, setHasError] = useState(false);

  const sex = searchParams.get('sex');

  const query = searchParams.get('query') || '';

  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const normalizedQuery = query.toLowerCase();
    const matchesSex = !sex || person.sex === sex;
    const matchesQuery =
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.some(century => {
        const startYear = (Number(century) - 1) * 100 + 1;
        const endYear = Number(century) * 100;

        return person.born >= startYear && person.born <= endYear;
      });

    return matchesQuery && matchesSex && matchesCentury;
  });

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const hasNoPeopleFromServer = !loading && !HasError && people.length === 0;
  const hasNoMatchingPeople =
    !loading && !HasError && people.length > 0 && filteredPeople.length === 0;
  const hasPeopleToShow = !loading && !HasError && filteredPeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !HasError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {HasError && (
                <div
                  data-cy="peopleLoadingError"
                  className="notification is-danger"
                >
                  An error occurred while fetching people.
                </div>
              )}

              {hasNoPeopleFromServer && (
                <div
                  data-cy="noPeopleMessage"
                  className="notification is-warning"
                >
                  There are no people on the server.
                </div>
              )}

              {hasNoMatchingPeople && (
                <div
                  data-cy="noPeopleMessage"
                  className="notification is-warning"
                >
                  There are no people matching your search criteria.
                </div>
              )}

              {hasPeopleToShow && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
