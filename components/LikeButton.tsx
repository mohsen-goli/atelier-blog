"use client";

import { useSyncExternalStore } from "react";

type LikeButtonProps = {
  slug: string;
};

function getSnapshot(storageKey: string) {
  if (typeof window === "undefined") return "0:false";

  const likes = localStorage.getItem(storageKey) ?? "0";
  const liked = localStorage.getItem(`${storageKey}-liked`) ?? "false";

  return `${likes}:${liked}`;
}

function subscribe(storageKey: string, callback: () => void) {
  function handleStorage(event: StorageEvent) {
    if (
      event.key === storageKey ||
      event.key === `${storageKey}-liked` ||
      event.key === null
    ) {
      callback();
    }
  }

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

export default function LikeButton({ slug }: LikeButtonProps) {
  const storageKey = `atelier-likes-${slug}`;

  const snapshot = useSyncExternalStore(
    (callback) => subscribe(storageKey, callback),
    () => getSnapshot(storageKey),
    () => "0:false",
  );

  const [likesValue, likedValue] = snapshot.split(":");
  const likes = Number(likesValue) || 0;
  const liked = likedValue === "true";

  function handleLike() {
    const nextLiked = !liked;
    const nextLikes = Math.max(0, likes + (nextLiked ? 1 : -1));

    localStorage.setItem(storageKey, String(nextLikes));
    localStorage.setItem(`${storageKey}-liked`, String(nextLiked));

    // Notify this tab; the browser's storage event handles other tabs.
    window.dispatchEvent(new StorageEvent("storage", { key: storageKey }));
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      aria-pressed={liked}
      className="inline-flex items-center gap-2 rounded-full border border-[#e9e4dc] px-5 py-3 text-sm transition hover:border-[#9b795b] hover:text-[#9b795b]"
    >
      <span className="text-lg">{liked ? "♥" : "♡"}</span>
      <span>{likes} Likes</span>
    </button>
  );
}
