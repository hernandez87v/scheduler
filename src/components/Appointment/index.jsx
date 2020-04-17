import React from 'react';
import Header from 'components/Appointment/Header.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Form from 'components/Appointment/Form';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const { time, interview, onEdit, onDelete, onSave, interviewers } = props;
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && (
          <Form
            name={''}
            interviewers={interviewers}
            interviewer={[]}
            onSave={onSave}
            onCancel={() => back()}
          />
        )}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer.name}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </article>
    </>
  );
}
