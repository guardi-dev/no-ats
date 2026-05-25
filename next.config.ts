import type { NextConfig } from "next";
import { links } from "./app/components/links";

const nextConfig: NextConfig = {
  output: "export",
  basePath: links.basePath
  /* config options here */
};

export default nextConfig;
