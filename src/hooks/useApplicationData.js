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

  const host = 'http://localhost:3000/api/';

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return Promise.resolve(
      axios.put(`${host}appointments/${id}`, appointment)
    ).then(() => {
      setState({ ...state, appointments });
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
    return axios
      .delete(`${host}appointments/${id}`, {
        appointmentCancel,
      })
      .then((res) => {
        setState({
          ...state,
          appointments,
        });
      });
  }

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
