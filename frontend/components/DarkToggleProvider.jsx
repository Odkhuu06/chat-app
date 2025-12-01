"use client";

import { useEffect, useState } from "react";
import DarkToggle from "./DarkToggle";

export default function DarkToggleProvider({ children }) {
  return (
    <>
      <DarkToggle />
      {children}
    </>
  );
}
