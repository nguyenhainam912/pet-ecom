"use client";

import classes from "@/css/main.button.module.css";
import { ReactNode } from "react";

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const MainButton = (props: IProps) => {
  const { children, onClick } = props;
  return (
    <a className={classes.mainButton} onClick={onClick}>
      {children}
    </a>
  );
};

export default MainButton;
