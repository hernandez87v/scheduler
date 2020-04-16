import React from 'react';
import Header from 'components/Appointment/Header.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  const { time, interview } = props;
  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {interview ? (
          <Show
            student={interview.student}
            interviewer={interview.interviewer.name}
          />
        ) : (
          <Empty />
        )}
      </article>
    </>
  );
}
