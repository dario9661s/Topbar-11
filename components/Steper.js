import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Animations from "./Animations/Animations";
import Colors from "../components/Design/Color";
import TopText from "../components/Content/TopText";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "50px",
  },
  // button: {
  //   marginRight: theme.spacing(1),
  // },
  // instructions: {
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(1),
  // },
}));

function getSteps() {
  return ["Content", "Design", "Animation"];
}

const StepperComponent = (props) => {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TopText
            shop={props.shop}
            countDownFocus={props.countDownFocus}
            setCountDownFocus={(fcs) => props.setCountDownFocus(fcs)}
            shippingFocused={props.shippingFocused}
            setShippingFocused={(focus) => props.setShippingFocused(focus)}
            link={props.link}
            setLink={(link) => props.setLink(link)}
            linkText={props.linkText}
            setLinkText={(linkText) => props.setLinkText(linkText)}
            countDownFinished={props.countDownFinished}
            setCountDownFinished={(cdf) => props.setCountDownFinished(cdf)}
            emptyText={props.emptyText}
            free={props.free}
            setFree={(text) => props.setFree(text)}
            moreAfter={props.moreAfter}
            setMoreAfter={(text) => props.setMoreAfter(text)}
            setEmptyText={(text) => props.setEmptyText(text)}
            moreBefore={props.moreBefore}
            setMoreBefore={(text) => props.setMoreBefore(text)}
            campaign={props.campaign}
            setCampaign={(camp) => props.setCampaign(camp)}
            setAnnouncment={(ann) => props.setAnnouncment(ann)}
            announcment={props.announcment}
            products={props.products}
            setProducts={(prod) => props.setProducts(prod)}
            setTimeRemaining={(time) => {
              props.setTimeRemaining(time);
            }}
            countDownText={props.countDownText}
            setCountDownText={(text) => props.setCountDownText(text)}
          />
        );
      case 1:
        return (
          <Colors
            fontColor={props.fontColor}
            setFontColor={(clr) => props.setFontColor(clr)}
            fontSize={props.fontSize}
            setFontSize={(size) => props.setFontSize(size)}
            shop={props.shop}
            value={props.value}
            setValue={(value) => props.setValue(value)}
            color={props.color}
            setColor={(color) => props.setColor(color)}
          />
        );
      case 2:
        return (
          <Animations
            campaign={props.campaign}
            animationProps={props.animationProps}
            setAnimationProps={(time) => props.setAnimationProps(time)}
          />
        );
      default:
        return "Unknown step";
    }
  }
  const classes = useStyles();
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(props.activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(props.activeStep);
    }
    props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSkip = () => {
    if (!isStepOptional(props.activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(props.activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    props.setActiveStep(0);
  };
  return (
    <div className={classes.root}>
      <Stepper activeStep={props.activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              onClick={() => props.setActiveStep(steps.indexOf(label))}
              key={label}
              {...stepProps}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {props.activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(props.activeStep)}
            </div>
            <div className="NextBackBtns">
              <Button
                disabled={props.activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {props.activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default StepperComponent;
