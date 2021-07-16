import React, { useCallback, useEffect, useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";

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
  const [axios] = useAxios();
  const [startDate, setStartDate] = useState(props.countDown.currentDate);
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
      props.setCountDown({ ...props.countDown, timeRemaining: diffDays });
    }
  }, [startDate]);
  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );
  const sendData = () => {
    axios
      .put(
        `https://massive-frog-5.loca.lt/campaign/countdown?text=${props.countDown.countDownText}&date=${startDate.end}&finish=${props.countDown.countDownFinished}`
      )
      .then((res) => res);
  };
  return (
    <div className="CampaignContainer">
      <FormLayout>
        <DatePicker
          disableDatesBefore={new Date(Date.now())}
          month={month}
          year={year}
          onChange={setStartDate}
          onMonthChange={handleMonthChange}
          selected={startDate.start}
        />
        <TextField
          label="Text before Timer"
          onFocus={() =>
            props.setCountDown({ ...props.countDown, countDownFocus: "timer" })
          }
          value={props.countDown.countDownText}
          onChange={(value) =>
            props.setCountDown({ ...props.countDown, countDownText: value })
          }
          type="text"
          placeholder="Sale!"
        />
        <TextField
          label="Text displayed when the timer is finished"
          onFocus={() =>
            props.setCountDown({
              ...props.countDown,
              countDownFocus: "finished",
            })
          }
          value={props.countDown.countDownFinished}
          onChange={(value) =>
            props.setCountDown({ ...props.countDown, countDownFinished: value })
          }
          type="text"
          placeholder="Timer finished!!!"
        />
        <Button
          disabled={startDate ? false : true}
          onClick={() => sendData()}
          primary
        >
          Save Changes!
        </Button>
      </FormLayout>
    </div>
  );
};
export default CountDown;
