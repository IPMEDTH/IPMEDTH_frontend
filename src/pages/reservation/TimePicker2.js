import React from 'react';
import {
  KeyboardTimePicker
} from '@material-ui/pickers'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons';

function TimePicker2() {

  const [selectedDate, setSelectedDate] = React.useState(
    null
  )

  const handleDateChange = (date) => {
    setSelectedDate(date);
    window.localStorage.setItem('timeend', date);
    var timedate = window.localStorage.getItem('timedate');
    var timestart = window.localStorage.getItem('timestart');
    var timeend = window.localStorage.getItem('timeend');
    timestart = timestart.substring(16,21);
    timeend = timeend.substring(16,21);
    window.localStorage.setItem('timestart', timestart);
    window.localStorage.setItem('timeend', timeend);
    console.log("times");
    console.log(timedate);
    console.log(timestart);
    console.log(timeend);
  };

  return (
    <KeyboardTimePicker
      autoOk
      ampm={false}
      disableFuture
      margin="normal"
      minutesStep="5"
      label="Selecteer eindtijd:"
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change time',
      }}
      keyboardIcon={<FontAwesomeIcon icon={faClock} />}
    />
  );
}

export default TimePicker2;
