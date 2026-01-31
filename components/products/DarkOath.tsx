"use client";

import ProductStage from "./ProductStage";
import { products } from "./data";

export default function DarkOath({ mousePos }: { mousePos: { x: number, y: number } }) {
  return <ProductStage product={products[0]} index={0} mousePos={mousePos} />;
}
