import React from 'react';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <section className="interviewers">
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.name === props.interviewer}
          setInterviewer={props.setInterviewer}
        />
      </section>
    );
  });
  return interviewers;
}
