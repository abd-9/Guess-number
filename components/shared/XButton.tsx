import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { colors } from "@mui/material";

// Define custom button styles
const CustomButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  color: "white",
  backgroundSize: " 150% 200%",
  borderRadius: "9px",
  "&:disabled": {
    background: colors.grey[500],
    color: "white",
  },
  fontWeight: "bold",
  transition: "all .3s",
  "&:hover": {
    backgroundSize: " 100% 100%",
  },
}));

// Custom button component
const XButton: React.FC<ButtonProps> = (props) => {
  return <CustomButton {...props} />;
};

export default XButton;
