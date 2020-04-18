import React from 'react';
import Header from 'components/Appointment/Header.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const { time, onEdit, onDelete, interviewers } = props;
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  // const CONFIRM = 'CONFIRM';
  // const DELETING = 'DELETING';
  // const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  // const ERROR_DELETE = 'ERROR_DELETE';
  // const ERROR_USER = 'ERROR_USER';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((event) => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            name={props.interview.student}
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={interviewers}
            interviewer={[]}
            onSave={save}
            onCancel={() => back()}
          />
        )}
        {mode === SAVING && <Status message="Saving..." />}
      </article>
    </>
  );
}
