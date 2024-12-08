"use client";

import { ChildrenProps } from "@/types";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: ChildrenProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;
