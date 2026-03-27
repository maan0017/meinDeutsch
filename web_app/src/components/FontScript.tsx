import React from "react";

/**
 * A tiny Server Component that injects a synchronous inline script.
 * Placed at the top of <body>, this reads localStorage before React hydrates,
 * and attaches the initial user font class. This completely eliminates FOUT!
 */
export function FontScript() {
  const code = `
    try {
      var raw = localStorage.getItem('settings');
      var font = 'Literata';
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.state && parsed.state.fontFamily) {
          font = parsed.state.fontFamily;
        }
      }
      var MAPPING = {
        "Literata": "font-literata",
        "IM_Fell_English": "font-fell",
        "Courier_Prime": "font-courier",
        "Roboto": "font-roboto",
        "Inter": "font-inter",
        "Outfit": "font-outfit",
        "Lora": "font-lora",
        "Playfair_Display": "font-playfair",
        "Fredoka": "font-fredoka",
        "system-sans": "font-system-sans",
        "system-serif": "font-system-serif",
        "system-mono": "font-system-mono",
        "Georgia": "font-georgia",
        "Times_New_Roman": "font-times",
        "Arial": "font-arial",
        "Trebuchet_MS": "font-trebuchet",
        "Verdana": "font-verdana"
      };
      var cls = MAPPING[font] || "font-literata";
      document.body.classList.add(cls);
    } catch (e) {
      document.body.classList.add("font-literata");
    }
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
