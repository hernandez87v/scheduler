import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const dayNumber = (id) => {
    const day = Math.floor(id / 5);
    if (day === 5) return 4;
    return day;
  };

  function spotsRemaining(day, dayCopy, appointments) {
    const appointmentId = dayCopy[day].appointments;
    let numSpotRem = 0;
    appointmentId.forEach((appointment) => {
      if (appointments[appointment].interview === null) {
        numSpotRem++;
      }
    });
    return numSpotRem;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const daysCopy = [...state.days];
    const specificDayCopy = {
      ...state.days[dayNumber(id)],
      spots: spotsRemaining(dayNumber(id), daysCopy, appointments),
    };

    const days = daysCopy.map((day, index) => {
      if (index === dayNumber(id)) {
        return specificDayCopy;
      }
      return day;
    });

    return Promise.resolve(
      axios.put(`${host}appointments/${id}`, appointment)
    ).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointmentCancel = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointmentCancel,
    };
    const daysCopy = [...state.days];
    const specificDayCopy = {
      ...state.days[dayNumber(id)],
      spots: spotsRemaining(dayNumber(id), daysCopy, appointments),
    };

    const days = daysCopy.map((day, index) => {
      if (index === dayNumber(id)) {
        return specificDayCopy;
      }
      return day;
    });
    return axios
      .delete(`${host}appointments/${id}`, {
        appointmentCancel,
      })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  const host = 'http://localhost:3000/api/';

  useEffect(() => {
    Promise.all([
      axios.get(`${host}days`),
      axios.get(`${host}appointments`),
      axios.get(`${host}interviewers`),
    ])
      .then((res) => {
        setState((prev) => ({
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data,
        }));
      })
      .catch((event) => event.stack);
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
