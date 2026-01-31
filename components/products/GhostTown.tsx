"use client";

import ProductStage from "./ProductStage";
import { products } from "./data";

export default function GhostTown({ mousePos }: { mousePos: { x: number, y: number } }) {
  return <ProductStage product={products[2]} index={2} mousePos={mousePos} />;
}
