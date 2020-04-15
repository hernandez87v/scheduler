import React from 'react';
import 'components/InterviewerListItem.scss';

let classNames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });
  const imageClass = classNames('interviewers__item-image');

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img className={imageClass} src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}
