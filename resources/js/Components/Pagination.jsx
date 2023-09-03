import React from 'react';
import { Link } from '@inertiajs/react';
import classNames from 'classnames';

const PageLink = ({ active, label, url }) => {
  const className = classNames(
    [
      'mr-1 mb-1',
      'px-3 py-3',
      'border border-solid border-blue-gray-100 rounded-full',
      'text-sm text-gray-700',
      'hover:bg-teal-100',
      'focus:outline-none focus:border-indigo-700 focus:text-indigo-700'
    ],
    {
      'bg-blue-gray-200': active
    }
  );
  return (
    <Link className={className} href={url}>
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </Link>
  );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
  const className = classNames(
    'mr-1 mb-1 px-3 py-3 text-sm border rounded-full border-solid border-gray-300 text-gray-700 bg-gray-200'
  );
  return (
    <li className={className} dangerouslySetInnerHTML={{ __html: label }} />
  );
};

export default function Pagination ({ links = [] }) {
  // dont render, if there's only 1 page (previous, 1, next)
  if (links.length === 3) return null;
  /*return (
    <div className="flex flex-wrap mt-6 -mb-1">
      {links.map(({ active, label, url }) => {
        return url === null ? (
          <PageInactive key={label} label={label} />
        ) : (
          <PageLink key={label} label={label} active={active} url={url} />
        );
      })}
    </div>
  );*/
    return(
        <nav className="mt-4">
        <ul className="flex">
            {links.map(({ active, label, url }) => {
                return url === null ? (
                  <PageInactive key={label} label={label} />
                ) : (
                  <PageLink key={label} label={label} active={active} url={url} />
                );
                })
            }
        </ul>
        </nav>
        )
};
