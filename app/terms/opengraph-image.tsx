import { card } from "../og";

export { size, contentType } from "../og";
export const alt = "VORQ Terms of service";

export default function Image() {
  return card({ eyebrow: "Legal", color: "#0b0b0c", title: ["Terms of service."], description: "The terms for using vorq.agency and the VORQ Lab tools, and for working with the studio." });
}
