import React, { useCallback, useState } from "react";
import { SketchPicker, SwatchesPicker } from "react-color";
import { useAxios } from "../../hooks/useAxios";
import SizeChanger from "./SizeChanger";
import { RadioButton, Stack, Heading, Layout, Card } from "@shopify/polaris";
import FontSize from "./FontSize";
import FontColor from "./FontColor";

const Colors = (props) => {
  const [axios] = useAxios();
  const [picker, setPicker] = useState("our");
  const changeColor = (color) => {
    axios
      .put(
        `https://massive-frog-5.loca.lt/design/color?color=${(color.hex.replace("#", ""))}`
      )
      .then((res) => res);
    props.setColor(color.hex);
  };
  const handleChange = useCallback(
    (_checked, newValue) => setPicker(newValue),
    []
  );
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Design" sectioned>
          <Heading element="h1">Background Color</Heading>
          <div style={{ marginTop: "10px" }}> </div>
          <Stack>
            <RadioButton
              label="Custom Colors"
              checked={picker === "our"}
              id="our"
              name="color"
              onChange={handleChange}
            />
            <RadioButton
              label="Colors"
              id="custom"
              name="color"
              checked={picker === "custom"}
              onChange={handleChange}
            />
          </Stack>
          <FontColor
            shop={props.shop}
            fontColor={props.fontColor}
            setFontColor={(clr) => props.setFontColor(clr)}
          />
          <FontSize
            fontSize={props.fontSize}
            shop={props.shop}
            setFontSize={(size) => props.setFontSize(size)}
          />
          <SizeChanger
            shop={props.shop}
            checked={props.checked}
            setAnimation={(newChecked) => props.setAnimation(newChecked)}
            value={props.value}
            setValue={(value) => props.setValue(value)}
          />
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card
          title={
            props.campaign === "Shipping"
              ? "Top Bar Text"
              : props.campaign === "Announcment"
              ? "Announcement"
              : props.campaign === "CountDown"
              ? "Count Down"
              : props.campaign === "Link"
              ? "Link"
              : null
          }
          sectioned
        >
          <Stack distribution="equalSpacing" alignment="center">
            {picker === "our" ? (
              <SwatchesPicker onChange={changeColor} width={300} height={300} />
            ) : (
              <SketchPicker
                disableAlpha
                color={props.color}
                onChangeComplete={changeColor}
                width={250}
                height={250}
              />
            )}
            <div className="DesignContainer">
              <img
                style={{ width: "200px", marginRight: "90px" }}
                src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
              />
            </div>
          </Stack>
        </Card>
      </Layout.Section>
    </Layout>
  );
};
export default Colors;
