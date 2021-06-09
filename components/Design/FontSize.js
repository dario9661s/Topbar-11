import React, { useCallback, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Heading, RadioButton, Stack } from "@shopify/polaris";

const FontSize = (props) => {
  const [axios] = useAxios();
  useEffect(() => {
    axios
      .put(
        `https://mighty-hound-83.loca.lt/design/fontsize?fontsize=${props.fontSize}`
      )
      .then((res) => console.log(res));
  }, [props.fontSize]);
  const handleChange = useCallback(
    (_checked, newValue) => props.setFontSize(newValue),
    []
  );
  return (
    <div style={{ marginTop: "30px" }}>
      <Heading element="h1">Font Size</Heading>
      <div style={{ marginTop: "10px" }}></div>
      <Stack>
        <RadioButton
          label="16px"
          checked={props.fontSize === "16px"}
          id="16px"
          name="fontSize"
          onChange={handleChange}
        />
        <RadioButton
          label="18px"
          id="18px"
          name="fontSize"
          checked={props.fontSize === "18px"}
          onChange={handleChange}
        />
        <RadioButton
          label="20px"
          id="20px"
          name="fontSize"
          checked={props.fontSize === "20px"}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};
export default FontSize;
