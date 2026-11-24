"use client";

import { useEffect, useState } from "react";

type LikeButtonProps = {
  slug: string;
};

export default function LikeButton({ slug }: LikeButtonProps) {
  const storageKey = `atelier-likes-${slug}`;
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedLikes = localStorage.getItem(storageKey);
    const savedLiked = localStorage.getItem(`${storageKey}-liked`);

    setLikes(savedLikes ? Number(savedLikes) : 0);
    setLiked(savedLiked === "true");
    setLoaded(true);
  }, [storageKey]);

  function handleLike() {
    if (!loaded) return;

    const nextLiked = !liked;
    const nextLikes = Math.max(0, likes + (nextLiked ? 1 : -1));

    setLiked(nextLiked);
    setLikes(nextLikes);

    localStorage.setItem(storageKey, String(nextLikes));
    localStorage.setItem(`${storageKey}-liked`, String(nextLiked));
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={!loaded}
      aria-pressed={liked}
      className="inline-flex items-center gap-2 rounded-full border border-[#e9e4dc] px-5 py-3 text-sm transition hover:border-[#9b795b] hover:text-[#9b795b] disabled:opacity-50"
    >
      <span className="text-lg">{liked ? "♥" : "♡"}</span>
      <span>{likes} Likes</span>
    </button>
  );
}
