import React, { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import Install from "../pages/install";
import Stepper from "../components/Steper";
import { getSessionToken } from "@shopify/app-bridge-utils";
import Preview from "../components/Preview";
import { useAxios } from "../hooks/useAxios";
import axioss from "axios";
import { Loading, Frame } from "@shopify/polaris";

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
  const [announcment, setAnnouncment] = useState("");
  const [products, setProducts] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [countDownText, setCountDownText] = useState("");
  const [countDownFinished, setCountDownFinished] = useState("");
  const [countDownFocus, setCountDownFocus] = useState();
  const [linkText, setLinkText] = useState("");
  const [link, setLink] = useState("");
  const [shop, setShop] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [fontColor, setFontColor] = useState("");

  useEffect(() => {
    if (shop) {
      axioss
        .get(
          `https://cleverchoicetopbar-default-rtdb.firebaseio.com/${shop}/.json`
        )
        .then((res) => {
          if (res.data.color) {
            setColor(res.data.color.color.hex);
          }
          if (res.data.fontSize) {
            setFontSize(res.data.fontSize.fontSize);
          }
          if (res.data.fontColor) {
            setFontColor(res.data.fontColor.fontColor);
          }
          if (res.data.cart) {
            const animation = res.data.cart.checked;
            setChecked(animation);
          }
          if (res.data.campaign.announcement) {
            setCampaign("Announcment");
            setAnnouncment(res.data.campaign.announcement.announcementText);
            setProducts(
              [...res.data.campaign.announcement.products].filter(Boolean)
            );
          }
          if (res.data.campaign.text) {
            setCampaign("Shipping");
            setEmptyText(res.data.campaign.text.before);
            setFree(res.data.campaign.text.freeShippin);
            setMoreAfter(res.data.campaign.text.after);
            setMoreBefore(res.data.campaign.text.before);
          }
          if (res.data.campaign.countDown) {
            setCampaign("CountDown");
            let date = res.data.campaign.countDown.date;
            let countDownDate = new Date(date).getTime();
            let now = new Date().getTime();
            let distance = countDownDate - now;
            setCountDownText(res.data.campaign.countDown.text);
            setCountDownFinished(res.data.campaign.countDown.finishText);
            setTimeRemaining(distance / 1000);
          }
          if (res.data.campaign.link) {
            setCampaign("Link");
            setLink(res.data.campaign.link.link);
            setLinkText(res.data.campaign.link.linkText);
          }
        });
    }
  }, [shop]);
  useEffect(() => {
    getUrl();
    fetchShippingRate();
  }, []);
  useEffect(() => {
    if (checked === "left") {
      axioss
        .put(
          `https://cleverchoicetopbar-default-rtdb.firebaseio.com/${shop}/cart.json`,
          { checked: checked }
        )
        .then((res) => res);
    } else if (checked === "right") {
      axioss
        .put(
          `https://cleverchoicetopbar-default-rtdb.firebaseio.com/${shop}/cart.json`,
          { checked: checked }
        )
        .then((res) => res);
    } else {
      axioss
        .put(
          `https://cleverchoicetopbar-default-rtdb.firebaseio.com/${shop}/cart.json`,
          { checked: checked }
        )
        .then((res) => res);
    }
  }, [checked]);
  async function fetchShippingRate() {
    const { data } = await axios.get(
      `https://mighty-hound-83.loca.lt/script_tag/ship`
    );
    setShippingRate(
      Number(
        data.details.body.shipping_zones[1].price_based_shipping_rates[0].price
      )
    );
  }
  async function getUrl() {
    const { data } = await axios.get(
      `https://mighty-hound-83.loca.lt/script_tag/shop`
    );
    setShop(data.details.domain.replaceAll(".", "_"));
  }
  return (
    <Frame>
      <Loading />
      <Preview
        fontColor={fontColor}
        fontSize={fontSize}
        countDownFocus={countDownFocus}
        linkText={linkText}
        shippingFocused={shippingFocused}
        countDownFinished={countDownFinished}
        countDownText={countDownText}
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
          fontColor={fontColor}
          setFontColor={(clr) => setFontColor(clr)}
          fontSize={fontSize}
          setFontSize={(size) => setFontSize(size)}
          countDownFocus={countDownFocus}
          setCountDownFocus={(fcs) => setCountDownFocus(fcs)}
          shop={shop}
          shippingFocused={shippingFocused}
          setShippingFocused={(focus) => setShippingFocused(focus)}
          link={link}
          setLink={(link) => setLink(link)}
          linkText={linkText}
          setLinkText={(linkText) => setLinkText(linkText)}
          countDownFinished={countDownFinished}
          setCountDownFinished={(cdf) => setCountDownFinished(cdf)}
          countDownText={countDownText}
          setCountDownText={(text) => setCountDownText(text)}
          setTimeRemaining={(time) => {
            setTimeRemaining(time);
          }}
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
    </Frame>
  );
}

export default index;
