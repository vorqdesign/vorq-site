import { card } from "../og";

export { size, contentType } from "../og";
export const alt = "VORQ Privacy policy";

export default function Image() {
  return card({ eyebrow: "Legal", color: "#0b0b0c", title: ["Privacy policy."], description: "What we collect on vorq.agency and in VORQ Lab tools, why, and the choices you have." });
}
