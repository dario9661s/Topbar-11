import React, { useCallback, useEffect, useState } from "react";
import axioss from "axios";
import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker"
import {
  TextField,
  FormLayout,
  Button,
  DatePicker,
  Heading,
} from "@shopify/polaris";

const CountDown = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(Date.now()),
    end: new Date(Date.now()),
  });
  useEffect(() => {
    if (startDate) {
      const oneDay = 1000; // hours*minutes*seconds*milliseconds
      const firstDate = startDate.end;
      const secondDate = new Date(Date.now());
      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      props.setTimeRemaining(diffDays);
    }
  }, [startDate]);

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );
  console.log(startDate);

  const sendData = () => {
    const data = {
      countDown: {
        text: props.countDownText,
        date: startDate.end,
        finishText: props.countDownFinished,
      },
    };
    axioss
      .put(
        `https://cleverchoicetopbar-default-rtdb.firebaseio.com/${props.shop}/campaign.json`,
        data
      )
      .then((res) => console.log(res));
  };
  const handleChangeCountDownFinished = useCallback(
    (value) => props.setCountDownFinished(value),
    []
  );
  const handleChange = useCallback(
    (value) => props.setCountDownText(value),
    []
  );
  return (
    <FormLayout>
      <DatePicker
        disableDatesBefore={new Date(Date.now())}
        month={month}
        year={year}
        onChange={setStartDate}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
      />
      {/* <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={Date.now()}
        placeholderText="Select a date after 5 days ago"
      /> */}
      <TextField
        value={props.countDownText}
        onChange={handleChange}
        type="text"
        placeholder="Text before the countdown"
      />
      <TextField
        value={props.countDownFinished}
        onChange={handleChangeCountDownFinished}
        type="text"
        placeholder="Text displayed when the countdown is finished"
      />
      <Button onClick={() => sendData()} primary>
        Save theme
      </Button>
    </FormLayout>
  );
};
export default CountDown;
