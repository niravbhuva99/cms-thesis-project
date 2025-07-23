import React, { useState, useEffect } from "react";
import Button, { Props as ButtonProps } from "@src/components/button/button";
import { Callout } from "@src/components/callout/Callout";
import { EvCarsChart } from "@src/components/callout/Banner";
import FloatingImage, {
  Props as FloatingImageProps,
} from "@src/components/floatingImage/floatingImage";

import ModifyImage from "./ModifyImage";
import NotFoundComponent from "./NotFound";
import Counter from "@src/components/counter/Counter";
const scope = {
  Button: (props: ButtonProps) => <Button {...props} />,
  require: (url: string) => {
    return url;
  },
  FloatingImage: (props: FloatingImageProps) => <ModifyImage {...props} />,
  Counter: (props: any) => <Counter {...props} />,
  Callout: (props: any) => <Callout {...props} />,
  EvCarsChart: (props: any) => <EvCarsChart {...props} />,
};

export default scope;
