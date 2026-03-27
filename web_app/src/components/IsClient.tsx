"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function IsClient() {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );

  if (!isClient) return null;
}
