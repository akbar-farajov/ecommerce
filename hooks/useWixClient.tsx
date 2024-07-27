"use client";

import { WixClientContext } from "@/context/wixContext";
import React, { useContext } from "react";

export const useWixClient = () => {
  return useContext(WixClientContext);
};
