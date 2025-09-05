import type { ReactNode, FC } from "react";
import DefaultLayout from "./default/DefaultLayout";
import MainLayout from "./main/MainLayout";

export type LayoutComponent = FC<{ children: ReactNode }>;

export const layouts: Record<string, LayoutComponent> = {
  default: DefaultLayout,
  main: MainLayout,
};