import React from "react";
import { Link } from "react-router-dom";

const ColorPicker = ({ onSelect }: any) => (
  <>
    <li><Link to="/settings" onClick={() => onSelect('leave_type_color_1')} className="btn btd-default leave_type_color_1" data-tom-color-picker-css-className="leave_type_color_1">Color 1</Link></li>
    <li><Link to="/settings" onClick={() => onSelect('leave_type_color_2')} className="btn btd-default leave_type_color_2" data-tom-color-picker-css-className="leave_type_color_2">Color 2</Link></li>
    <li><Link to="/settings" onClick={() => onSelect('leave_type_color_3')} className="btn btd-default leave_type_color_3" data-tom-color-picker-css-className="leave_type_color_3">Color 3</Link></li>
    <li><Link to="/settings" onClick={() => onSelect('leave_type_color_4')} className="btn btd-default leave_type_color_4" data-tom-color-picker-css-className="leave_type_color_4">Color 4</Link></li>
    <li><Link to="/settings" onClick={() => onSelect('leave_type_color_5')} className="btn btd-default leave_type_color_5" data-tom-color-picker-css-className="leave_type_color_5">Color 5</Link></li>
  </>
);

export default ColorPicker;
