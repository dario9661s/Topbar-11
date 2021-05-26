import React, { useState } from "react";
import axioss from "axios";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import subDays from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

setDefaultLocale("es", es);

const CountDown = (props) => {
  const [startDate, setStartDate] = useState(null);

  if (startDate) {
    console.log(
      startDate.toLocaleDateString("en-US").split(/:| /)[0].replace(/\D/g, "")
    );
    console.log(typeof startDate);
  }

  return (
    <DatePicker
      locale="es"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date("05 26 2021")}
      placeholderText="Select a date after 5 days ago"
    />
  );
};
export default CountDown;
