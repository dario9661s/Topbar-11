import React, { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import Install from "../pages/install";
import Stepper from "../components/Steper";
import Preview from "../components/Preview";
import { useAxios } from "../hooks/useAxios";
import axioss from "axios";
import { Loading, Frame } from "@shopify/polaris";

function index({ shopOrigin }) {
  const app = useAppBridge();
  const [axios] = useAxios();
  const [shippingRate, setShippingRate] = useState(null);
  const [step, setStep] = useState(0);
  const [color, setColor] = useState("transparent");
  const [value, setValue] = useState("50px");
  const [campaign, setCampaign] = useState("");
  const [emptyText, setEmptyText] = useState("");
  const [moreBefore, setMoreBefore] = useState("");
  const [moreAfter, setMoreAfter] = useState("");
  const [free, setFree] = useState("");
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
  const [animationProps, setAnimationProps] = useState({
    animation: "",
    animationTiming: "once",
    animationSecounds: "1",
  });

  useEffect(() => {
    let namespace = "cleverchoice";
    let key = "topbar";
    axios
      .get(`https://tidy-shrimp-31.loca.lt/campaign/metafields`)
      .then((res) => {
        let rateMetafields = res.data;
        let data = null;
        if (res.data.body.metafields) {
          rateMetafields["body"]["metafields"] &&
            rateMetafields["body"]["metafields"].forEach((metafield) => {
              if (
                metafield["namespace"] === namespace &&
                metafield["key"] === key
              ) {
                data = JSON.parse(metafield.value);
                if (data.design.color) {
                  setColor(data.design.color);
                }
                if (data.design.fontSize) {
                  setFontSize(data.design.fontSize);
                }
                if (data.design.fontColor) {
                  setFontColor(data.design.fontColor);
                }
              }
            });
        }

        if (res.data.cart) {
          // const animation = res.data.cart.checked;
          // setAnimation(animation);
        }
      });
  }, []);
  useEffect(() => {
    getUrl();
    fetchShippingRate();
  }, []);

  async function fetchShippingRate() {
    const { data } = await axios.get(
      `https://tidy-shrimp-31.loca.lt/script_tag/ship`
    );
    setShippingRate(
      Number(
        data.details.body.shipping_zones[1].price_based_shipping_rates[0].price
      )
    );
  }
  async function getUrl() {
    const { data } = await axios.get(
      `https://tidy-shrimp-31.loca.lt/script_tag/shop`
    );
    setShop(data.details.domain.replaceAll(".", "_"));
  }
  return (
    <Frame>
      <Loading />
      <Preview
        // animationTiming = {animationTiming}
        // setAnimationTiming = {(time)=>setAnimationTiming(time)}
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
      />
      <div className="Progress">
        <Stepper
          animationProps={animationProps}
          setAnimationProps={(time) => setAnimationProps(time)}
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
        />
      </div>
      <Install />
    </Frame>
  );
}

export default index;
