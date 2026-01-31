"use client";

import ProductStage from "./ProductStage";
import { products } from "./data";

export default function Outland({ mousePos }: { mousePos: { x: number, y: number } }) {
  return <ProductStage product={products[1]} index={1} mousePos={mousePos} />;
}
