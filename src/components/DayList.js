import React from 'react';
import ReactDOM from 'react-dom';
import DayListItem from 'components/DayListItem';

const day = days[0];

function DayList(props) {
  const days = props.days.map((day) => {
    return (
      //   <ul>
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
      //   </ul>
    );
  });
  return days;
}

ReactDOM.render(
  <DayList days={days} day={day} setDay={action({ setDay })} />,
  document.getElementById('root')
);
