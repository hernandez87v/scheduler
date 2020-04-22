import React from 'react';
import Header from 'components/Appointment/Header.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const { time, interviewers } = props;
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <>
      <Header time={time} />
      <article time={time} className="appointment" data-testid="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            name={props.interview.student}
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={interviewers}
            // interviewer={[]}
            onSave={save}
            onCancel={() => back()}
          />
        )}
        {mode === SAVING && <Status message="Saving..." />}
        {mode === ERROR_SAVE && (
          <Error onClose={() => back()} message="Could not save appointment" />
        )}
        {mode === DELETING && <Status message="Deleting..." />}
        {mode === ERROR_DELETE && (
          <Error
            onClose={() => back()}
            message="Could not delete appointment"
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onConfirm={destroy}
            onCancel={() => transition(SHOW)}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewers={interviewers}
            interviewer={props.interview.interviewer.id}
            onCancel={() => back()}
            onSave={save}
          />
        )}
      </article>
    </>
  );
}
