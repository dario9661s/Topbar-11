import {
  Layout,
  Page,
  DisplayText,
  Card,
  FormLayout,
  TextStyle,
  Checkbox,
} from "@shopify/polaris";
import Colors from "../components/Color"
import SizeChanger from "../components/SizeChanger"
import TopText from "../components/TopText"
import React, { useEffect, useCallback, useState } from "react";

import {useAppBridge} from "@shopify/app-bridge-react";
import {getSessionToken} from "@shopify/app-bridge-utils";
import {useAxios} from "../hooks/useAxios";
import axioss from "axios";

function index({ shopOrigin }) {
  const app = useAppBridge();
  const [axios] = useAxios();
  const [shippingRate, setShippingRate] = useState(null);
  const [text, setText] = useState({})

  const [color, setColor] = useState()
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('50px');

  useEffect(() => {
    deleteData()
    fetchShippingRate()
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json").then(res => {
    })
  }, []);
  console.log(process.env.HOST)
  useEffect(() => {
    sendShippingRates()
  }, [shippingRate]);

  useEffect(() => {
    if(checked){
      axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json", {checked:checked}).then(res=>console.log(res))
    } else {
      axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json").then(res=>console.log(res))
    }
  }, [checked]);

  async function fetchShippingRate() {
    const {data} = await axios.get(
      `https://afraid-crab-100.loca.lt/script_tag/ship`
    );
    setShippingRate(Number(data.details.body.shipping_zones[1].price_based_shipping_rates[0].price));
  }

  const deleteData = () => {
    axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/rates.json").then(res=>console.log(res))
  }
  const sendShippingRates = () => {
    const params = {
      rates : shippingRate
    }
    console.log(params)
    axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/rates.json", params).then(res=>console.log(res))
  }
  const handleChangeCheckBox = useCallback((newChecked) => setChecked(newChecked), []);

  return (
    <React.Fragment>
      <div className="background" style={{ width:"100%", backgroundColor:color, height:value,display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", zIndex:"1000"}}>
        <p className={checked? "animation" : null} style={checked?{flex: "1"} : null}>Add items to get free shipping </p>
      </div>
      <Page>
        <Layout>
          <div style={{width:"20px", height:"50px"}}></div>
          <Layout.AnnotatedSection
            title={ shippingRate?<DisplayText size="medium">Current Shipping Rate:{" " + shippingRate}</DisplayText> : null}
            description={<TextStyle variation="strong">To change the shipping rate go to shopify admin</TextStyle>}
          >
            <Card sectioned>
              <FormLayout>
                <Colors color = {color} setColor = {(color)=>setColor(color)}/>
                <Checkbox
                  label="Enable Animation!"
                  checked={checked}
                  onChange={handleChangeCheckBox}
                />
                <SizeChanger value = {value} setValue = {(value)=>setValue(value)}/>
                <TopText/>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    </React.Fragment>

  );
}

export default index;
