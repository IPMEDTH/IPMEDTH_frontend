import React from 'react';
import {
  KeyboardTimePicker
} from '@material-ui/pickers'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons';

function TimePicker1() {

  const [selectedDate, setSelectedDate] = React.useState(
    null
  )

  const handleDateChange = (date) => {
    setSelectedDate(date);
    window.localStorage.setItem('timestart', date);

    var timestart = window.localStorage.getItem('timestart');
    timestart = timestart.substring(16,21);
    window.localStorage.setItem('timestart', timestart);
  };

  return (
    <section>
      <KeyboardTimePicker
        autoOk
        ampm={false}
        margin="normal"
        id="time-picker"
        label="Selecteer begintijd:"
        minutesStep="5"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
        keyboardIcon={<FontAwesomeIcon icon={faClock} />}
      />
    </section>
  );
}

export default TimePicker1;
