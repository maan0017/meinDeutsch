import localFont from "next/font/local";
import {
  IM_Fell_English,
  Courier_Prime,
  Roboto,
  Inter,
  Outfit,
  Lora,
  Playfair_Display,
  Fredoka,
  Merriweather,
  Poppins,
  Source_Sans_3,
} from "next/font/google";

export const literata = localFont({
  src: [
    {
      path: "../fonts/Literata-Bold-subset.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Literata-Bold-subset.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-literata",
  display: "swap",
  preload: true,
});

export const imFellEnglish = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fell",
  display: "swap",
  preload: false,
});

export const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
  preload: false,
});

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  preload: false,
});

// --- New Professional Fonts ---

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
});

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  preload: false,
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  preload: false,
});

export const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  preload: false,
});

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  preload: false,
});

// A single string of all variable classes to be inserted in the <body>
// Important: Next.js static analyzer requires standard template literals,
// Array.join() causes the @font-face CSS to silently drop during SSR compilation!
export const ALL_FONT_VARIABLES = `${literata.variable} ${imFellEnglish.variable} ${courierPrime.variable} ${roboto.variable} ${inter.variable} ${outfit.variable} ${lora.variable} ${playfairDisplay.variable} ${fredoka.variable} ${merriweather.variable} ${poppins.variable} ${sourceSans3.variable}`;
