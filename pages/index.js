import React, { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import Install from "../pages/install";
import Stepper from "../components/Steper";
import { getSessionToken } from "@shopify/app-bridge-utils";
import Preview from "../components/Preview";
import { useAxios } from "../hooks/useAxios";
import axioss from "axios";

function index({ shopOrigin }) {
  const app = useAppBridge();
  const [axios] = useAxios();
  const [shippingRate, setShippingRate] = useState(null);
  const [step, setStep] = useState(0);
  const [color, setColor] = useState();
  const [checked, setChecked] = useState();
  const [value, setValue] = useState("50px");
  const [campaign, setCampaign] = useState();
  const [emptyText, setEmptyText] = useState();
  const [moreBefore, setMoreBefore] = useState();
  const [moreAfter, setMoreAfter] = useState();
  const [free, setFree] = useState();
  const [announcment, setAnnouncment] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    deleteData();
    fetchShippingRate();
    axioss
      .get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json")
      .then((res) => {
        setColor(Object.values(res.data)[0].color.hex);
      });
    axioss
      .get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json")
      .then((res) => {
        if (res.data) {
          const animation = Object.values(res.data)[0].checked;
          setChecked(animation);
        }
      });
    axioss
      .get(
        "https://cleverchoicetopbar-default-rtdb.firebaseio.com/textAnnouncment.json"
      )
      .then((res) => {
        if (res.data) {
          setAnnouncment(Object.values(res.data)[0].announcmentText);
        }
        axioss
          .get(
            "https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json"
          )
          .then((res) => {
            if (res.data) {
              setEmptyText(Object.values(res.data)[0].before);
              setFree(Object.values(res.data)[0].freeShippin);
              setMoreAfter(Object.values(res.data)[0].after);
              setMoreBefore(Object.values(res.data)[0].before);
            }
          });
      });
    axioss
      .get(
        "https://cleverchoicetopbar-default-rtdb.firebaseio.com/textAnnouncment.json"
      )
      .then((res) => {
        if (res.data) {
          setProducts([...Object.values(res.data)[0].products]);
        }
      });
  }, []);
  console.log(step);
  useEffect(() => {
    sendShippingRates();
  }, [shippingRate]);

  useEffect(() => {
    if (checked === "left") {
      axioss
        .delete(
          "https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json"
        )
        .then((res) => console.log(res))
        .then(() => {
          axioss
            .post(
              "https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json",
              { checked: checked }
            )
            .then((res) => console.log(res));
        });
    } else if (checked === "right") {
      axioss
        .delete(
          "https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json"
        )
        .then((res) => console.log(res))
        .then(() => {
          axioss
            .post(
              "https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json",
              { checked: checked }
            )
            .then((res) => console.log(res));
        });
    } else {
      axioss
        .delete(
          "https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json"
        )
        .then((res) => console.log(res))
        .then(() => {
          axioss
            .post(
              "https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json",
              { checked: checked }
            )
            .then((res) => console.log(res));
        });
    }
  }, [checked]);

  async function fetchShippingRate() {
    const { data } = await axios.get(
      `https://unlucky-deer-73.loca.lt/script_tag/ship`
    );
    setShippingRate(
      Number(
        data.details.body.shipping_zones[1].price_based_shipping_rates[0].price
      )
    );
  }
  const deleteData = () => {
    axioss
      .delete(
        "https://cleverchoicetopbar-default-rtdb.firebaseio.com/rates.json"
      )
      .then((res) => console.log(res));
  };
  const sendShippingRates = () => {
    const params = {
      rates: shippingRate,
    };
    // console.log(params)
    axioss
      .post(
        "https://cleverchoicetopbar-default-rtdb.firebaseio.com/rates.json",
        params
      )
      .then((res) => console.log(res));
  };
  return (
    <React.Fragment>
      <Preview
        announcment={announcment}
        text={{
          empty: emptyText,
          moreBefore: moreBefore,
          moreAfter: moreAfter,
          free: free,
        }}
        products={products}
        campaign={campaign}
        color={color}
        value={value}
        checked={checked}
      />
      <div className="Progress">
        <Stepper
          products={products}
          setProducts={(prod) => setProducts(prod)}
          emptyText={emptyText}
          free={free}
          setFree={(text) => setFree(text)}
          moreAfter={moreAfter}
          setMoreAfter={(text) => setMoreAfter(text)}
          setEmptyText={(text) => setEmptyText(text)}
          moreBefore={moreBefore}
          setMoreBefore={(text) => setMoreBefore(text)}
          setAnnouncment={(ann) => setAnnouncment(ann)}
          announcment={announcment}
          campaign={campaign}
          setCampaign={(camp) => setCampaign(camp)}
          value={value}
          setValue={(value) => setValue(value)}
          color={color}
          setColor={(color) => setColor(color)}
          activeStep={step}
          setActiveStep={(step) => setStep(step)}
          checked={checked}
          setChecked={(newChecked) => setChecked(newChecked)}
        />
      </div>
      <Install />
    </React.Fragment>
  );
}

export default index;
