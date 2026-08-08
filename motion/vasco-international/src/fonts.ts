import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonte oficial (Barlow) carregada localmente — os .ttf ficam em
// public/fonts/, sem depender de rede no momento do render (o Chromium
// do render não confia no proxy da rede aqui, então Google Fonts remoto
// falha com erro de certificado).
const FAMILY = "Barlow";

const weights: { weight: string; style: "normal" | "italic"; file: string }[] = [
  { weight: "400", style: "normal", file: "Barlow-Regular.ttf" },
  { weight: "500", style: "normal", file: "Barlow-Medium.ttf" },
  { weight: "600", style: "normal", file: "Barlow-SemiBold.ttf" },
  { weight: "700", style: "normal", file: "Barlow-Bold.ttf" },
  { weight: "800", style: "normal", file: "Barlow-ExtraBold.ttf" },
  { weight: "500", style: "italic", file: "Barlow-MediumItalic.ttf" },
  { weight: "600", style: "italic", file: "Barlow-SemiBoldItalic.ttf" },
];

weights.forEach(({ weight, style, file }) => {
  loadFont({
    family: FAMILY,
    url: staticFile(`fonts/${file}`),
    weight,
    style,
  });
});

export const barlow = FAMILY;
