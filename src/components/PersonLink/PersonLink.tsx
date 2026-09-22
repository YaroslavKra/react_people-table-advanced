import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink = ({ person }: PersonLinkProps) => (
  <Link
    to={`/people/${person.slug}`}
    data-cy="personLink"
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);
