import { ReactNode } from "react";
import css from "./Container.module.scss";

const Container = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className={css.container}>{children}</div>;
};

export default Container;
