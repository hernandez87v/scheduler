import React, { useState } from 'react';
import Button from 'components/Button.jsx';
import InterviewerList from 'components/InterviewerList.jsx';

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');
  const { interviewers, onCancel } = props;
  const [error, setError] = useState('');

  function reset() {
    setName('');
    setInterviewer(null);
  }

  function cancel() {
    props.onCancel();
    reset();
  }
  {
    /* line 10 to 21 added for test/ if theres issues can comment out */
  }
  function validate() {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }
    setError('');
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            {' '}
            {/* was onCancel line 17 */}
            Cancel
          </Button>
          <Button onClick={() => validate()} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
