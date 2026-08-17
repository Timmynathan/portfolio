import type { IconType } from "react-icons";
import { SiPython, SiReact, SiDjango, SiTensorflow, SiTypescript, SiNodedotjs } from "react-icons/si";

export const STACK_ICONS: Record<string, { Icon: IconType; color: string; label: string }> = {
  Python: { Icon: SiPython, color: "#3776AB", label: "Python" },
  TensorFlow: { Icon: SiTensorflow, color: "#FF6F00", label: "TensorFlow" },
  React: { Icon: SiReact, color: "#61DAFB", label: "React" },
  Django: { Icon: SiDjango, color: "#0C4B33", label: "Django" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
};
