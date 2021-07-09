import React, { useState } from "react";
import { SketchPicker, SwatchesPicker } from "react-color";
import { useAxios } from "../../hooks/useAxios";
import SizeChanger from "./SizeChanger";
import { ButtonGroup, Button, Stack, Heading, Layout, Card } from "@shopify/polaris";
import FontSize from "./FontSize";
import FontColor from "./FontColor";
import Italic from "./Italic"
import Icons from "./Icons"
import { ColorPicker } from "react-color-palette";
import { ColorPicker as ColorPickerback } from "react-color-palette";
import LetterSpacing from "./LetterSpacing";
import "react-color-palette/lib/css/styles.css";


const Colors = (props) => {
  const [axios] = useAxios();
  const [picker, setPicker] = useState("our");

  const changeColor = () => {

    axios
      .put(
        `https://funny-goat-3.loca.lt/design/design?color=${props.colorBack.hex.replace("#", "" )}&fontsize=${props.design.fontSize}&size=${props.design.value}&fontcolor=${props.color.hex.replace("#", "" )}&italic=${props.design.italic}`).then((res) => console.log(res))
  };
console.log(props.colorBack);
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Design" sectioned>
          <Stack vertical>
          <Icons
               design = {props.design}
               setDesign={(color) => props.setDesign(color)}/>
          <FontSize
              design = {props.design}
              setDesign={(color) => props.setDesign(color)}
          />
          <SizeChanger
           design = {props.design}
           setDesign={(color) => props.setDesign(color)}
          />
          <LetterSpacing
          design = {props.design}
          setDesign={(color) => props.setDesign(color)}/>
          <Button onClick={()=>changeColor()} fullWidth primary>Save Design</Button>
          </Stack>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card
          title= { picker === "our"? "Font Color" : "Background Color" }
          sectioned
        >
          <Stack distribution="fill">
            <Stack vertical>
            {picker === "our"? <ColorPicker width={320} height={190} color={props.color} onChange={props.setColor} hideHSV />: <ColorPickerback hideHSV  dark width={320} height={190} color={props.colorBack} onChange={props.setColorBack}/>}
            </Stack>
              <Stack vertical>
              <FontColor
                design = {props.design}
                setDesign={(color) => props.setDesign(color)}
              />
              <Italic
               design = {props.design}
               setDesign={(color) => props.setDesign(color)}/>
               <Stack vertical>
                  <Heading element="h1">Colors</Heading>
                  <ButtonGroup fullWidth segmented={true}  >
                    <Button pressed={picker==="our"? true : false} onClick = {()=>setPicker("our")}>Font</Button>
                    <Button pressed={picker==="custom"? true : false} onClick = {()=>setPicker("custom")}>Background</Button>
                  </ButtonGroup>
              </Stack>
              </Stack>
            <Stack></Stack>
          </Stack>


        </Card>
      </Layout.Section>
    </Layout>
  );
};
export default Colors;
