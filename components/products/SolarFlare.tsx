"use client";

import ProductStage from "./ProductStage";
import { products } from "./data";

export default function SolarFlare({ mousePos }: { mousePos: { x: number, y: number } }) {
  return <ProductStage product={products[4]} index={4} mousePos={mousePos} />;
}
