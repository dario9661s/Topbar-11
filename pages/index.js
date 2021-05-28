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
  const [moreBefore, setMoreBefore] = useState("");
  const [moreAfter, setMoreAfter] = useState("");
  const [free, setFree] = useState();
  const [shippingFocused, setShippingFocused] = useState("");
  const [announcment, setAnnouncment] = useState();
  const [products, setProducts] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [countDownText, setCountDownText] = useState("");
  const [countDownFinished, setCountDownFinished] = useState("");
  const [linkText, setLinkText] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    deleteData();
    fetchShippingRate();
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/color.json").then((res) => {
        setColor(Object.values(res.data)[0].color.hex);
      });
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/cart.json").then((res) => {
        if (res.data) {
          const animation = Object.values(res.data)[0].checked;
          setChecked(animation);
        }
      });
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json").then((res) => {
        if (res.data.announcement) {
          setAnnouncment(res.data.announcement.announcementText);
        }
        axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json").then((res) => {
            if (res.data.text) {
              setEmptyText(res.data.text.before);
              setFree(res.data.text.freeShippin);
              setMoreAfter(res.data.text.after);
              setMoreBefore(res.data.text.before);
            }
          });
      });
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json").then((res) => {
        if (res.data.announcement) {
          setProducts([...res.data.announcement.products].filter(Boolean) );
        }
      });
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json").then((res) => {
        if (res.data.countDown) {
          let date = res.data.countDown.date
          let countDownDate = new Date(date).getTime();
          let now = new Date().getTime();
          let distance = countDownDate - now;
          setCountDownText(res.data.countDown.text)
          setCountDownFinished(res.data.countDown.finishText)
          setTimeRemaining(distance/1000)
        }
      });
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json").then((res) => {
      if (res.data.link) {
        setLink(res.data.link.link)
        setLinkText(res.data.link.linkText)
      }
    });
  }, []);
  console.log(campaign)
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
      `https://nice-dolphin-78.loca.lt/script_tag/ship`
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
        linkText = {linkText}
        shippingFocused = {shippingFocused}
        countDownFinished = {countDownFinished}
        countDownText = {countDownText}
        timeRemaining={timeRemaining}
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
          shippingFocused = {shippingFocused}
          setShippingFocused = {(focus)=>setShippingFocused(focus)}
          link = {link}
          setLink = {(link)=> setLink(link)}
          linkText = {linkText}
          setLinkText = {(linkText)=> setLinkText(linkText)}
          countDownFinished = {countDownFinished}
          setCountDownFinished = {(cdf)=>setCountDownFinished(cdf)}
          countDownText = {countDownText}
          setCountDownText = {(text)=> setCountDownText(text)}
          setTimeRemaining={(time)=> {setTimeRemaining(time)}}
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
