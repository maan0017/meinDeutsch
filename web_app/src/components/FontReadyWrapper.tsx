// components/FontReadyWrapper.tsx
"use client";

import { useEffect, useState } from "react";

export default function FontReadyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);

  return (
    <div
      className="h-full w-full transition-opacity duration-300"
      style={{ opacity: ready ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
