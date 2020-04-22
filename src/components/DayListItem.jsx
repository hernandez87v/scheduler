import React from 'react';
import 'components/DayListItem.scss';

let classNames = require('classnames');

export default function DayListItem(props) {
  function formatSpots() {
    if (props.spots >= 2) {
      return `${props.spots} spots remaining`;
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    } else {
      return 'no spots remaining';
    }
  }

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
