import React, { useEffect, useState } from "react";
import {useAppBridge} from "@shopify/app-bridge-react";
import Install from "../pages/install"
import Stepper from "../components/Steper";
import {getSessionToken} from "@shopify/app-bridge-utils";
import {useAxios} from "../hooks/useAxios";
import axioss from "axios";

function index({ shopOrigin }) {
  const app = useAppBridge();
  const [axios] = useAxios();
  const [shippingRate, setShippingRate] = useState(null);
  const [step, setStep] = useState(0)
  const [color, setColor] = useState()
  const [checked, setChecked] = useState("");
  const [value, setValue] = useState('50px');

  useEffect(() => {
    deleteData()
    fetchShippingRate()
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json").then(res => {
      const color = Object.values(res.data)[0].color.hex
      setColor(color)
    })
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json").then(res => {
      const animation = Object.values(res.data)[0].checked
      setChecked(animation)

    })
  }, []);

  console.log(step)
  useEffect(() => {
    sendShippingRates()
  }, [shippingRate]);

  useEffect(() => {
    if(checked === "left"){
      axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json").then(res=>console.log(res)).then(()=> {
        axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json", {checked:checked}).then(res=>console.log(res))
      })
    } else if (checked=== "right") {
      axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json").then(res=>console.log(res)).then(()=> {
        axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json", {checked:checked}).then(res=>console.log(res))
      })
    } else {
      axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json").then(res=>console.log(res)).then(()=> {
        axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json", {checked:checked}).then(res=>console.log(res))
      })
    }
  }, [checked]);
  console.log(checked)
  async function fetchShippingRate() {
    const {data} = await axios.get(
      `https://wicked-eel-96.loca.lt/script_tag/ship`
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
    // console.log(params)
    axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/rates.json", params).then(res=>console.log(res))
  }

  return (
    <React.Fragment>
      <div className="background" style={{ width:"100%", backgroundColor:color, height:value,display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", zIndex:"1000"}}>
        <p className={checked=== "left"? "animation" : checked=== "right"?  "animationRight" : null} style={checked=== "left" || checked=== "right" ? {flex: "1"} : null}>Add items to get free shipping </p>
      </div>
      <div className="Progress">
        <Stepper
          value = {value} setValue = {(value)=>setValue(value)} color={color} setColor={(color) => setColor(color)}
          activeStep = {step}
          setActiveStep = {(step)=>setStep(step)}
          checked = {checked} setChecked={(newChecked)=>setChecked(newChecked)}
        />
      </div>
      <Install/>
    </React.Fragment>

  );
}

export default index;
