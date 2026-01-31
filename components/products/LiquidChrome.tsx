"use client";

import ProductStage from "./ProductStage";
import { products } from "./data";

export default function LiquidChrome({ mousePos }: { mousePos: { x: number, y: number } }) {
  return <ProductStage product={products[3]} index={3} mousePos={mousePos} />;
}
