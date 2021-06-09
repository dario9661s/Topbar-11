import React, { useCallback, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Heading, RadioButton, Stack } from "@shopify/polaris";

const FontColor = (props) => {
  const [axios] = useAxios();
  useEffect(() => {
    axios
      .put(
        `https://mighty-hound-83.loca.lt/design/fontcolor?fontcolor=${props.fontColor}`
      )
      .then((res) => console.log(res));
  }, [props.fontColor]);
  const handleChange = useCallback(
    (_checked, newValue) => props.setFontColor(newValue),
    []
  );
  return (
    <div style={{ marginTop: "30px" }}>
      <Heading element="h1">Font Color</Heading>
      <div style={{ marginTop: "10px" }}></div>
      <Stack>
        <RadioButton
          label="black"
          checked={props.fontColor === "black"}
          id="black"
          name="fontColor"
          onChange={handleChange}
        />
        <RadioButton
          label="white"
          id="white"
          name="fontColor"
          checked={props.fontColor === "white"}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};
export default FontColor;
