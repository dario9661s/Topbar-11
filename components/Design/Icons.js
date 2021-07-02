import React from "react";
import { Heading, ButtonGroup, Stack } from "@shopify/polaris";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import GradeIcon from '@material-ui/icons/Grade';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
const Icons = (props) => {
  return (
      <Stack vertical>
        <Heading element="h1">Icons</Heading>
        <Stack alignment="center" distribution="center" fullWidth>
          
            <Stack>
            {props.design.icons==="like" || props.design.icons === "arrow"? <div className="Icons" onClick = {()=>props.setDesign({...props.design, rotateLeft:!props.design.rotateLeft})}>  <RotateLeftIcon color={props.design.rotateLeft? "primary" : "disabled"} /></div> : null}
            {props.design.icons !== "none"?<div className="Icons" onClick = {()=>props.setDesign({...props.design, iconLeftActive:!props.design.iconLeftActive})}>  <ArrowLeftIcon color={props.design.iconLeftActive? "primary" : "disabled"} /></div>: <div style={{height:"30px"}}></div>}
            </Stack>
            <Stack>
            {props.design.icons !== "none"?<div className="Icons" onClick = {()=>props.setDesign({...props.design, iconRightActive:!props.design.iconRightActive})}><ArrowRightIcon color={props.design.iconRightActive? "primary" : "disabled"} /></div>: <div style={{height:"30px"}}></div>}
            {props.design.icons==="like" || props.design.icons === "arrow"? <div className="Icons" onClick = {()=>props.setDesign({...props.design, rotateRight:!props.design.rotateRight})}><RotateRightIcon color={props.design.rotateRight? "primary" : "disabled"} /></div> : null}
            </Stack>
        </Stack>
        <Stack alignment="center" distribution="center" spacing="extraLoose" fullWidth>
            <div className="Icons" onClick = {()=>props.setDesign({...props.design, icons:"like"})}>  <ThumbUpIcon color={props.design.icons ==="like"? "primary" : "disabled"} /></div>
            <div className="Icons" onClick = {()=>props.setDesign({...props.design, icons:"arrow"})}>  <DoubleArrowIcon color={props.design.icons ==="arrow"? "primary" : "disabled"} /></div>
            <div className="Icons" onClick = {()=>props.setDesign({...props.design, icons:"star"})}>  <GradeIcon color={props.design.icons ==="star"? "primary" : "disabled"} /></div>
            <div className="Icons" onClick = {()=>props.setDesign({...props.design, icons:"check"})}>  <DoneIcon color={props.design.icons ==="check"? "primary" : "disabled"} /></div>
            <div className="Icons" onClick = {()=>props.setDesign({...props.design, icons:"none"})}><ClearIcon color={props.design.icons ==="none"? "primary" : "disabled"} /></div>
        </Stack>
      </Stack>
  );
};
export default Icons;
