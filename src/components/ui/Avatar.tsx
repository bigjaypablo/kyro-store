import { useState } from "react";
import { avatarFor } from "../../data/avatars";

export default function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const src = avatarFor(name);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  if (!src || failed) {
    return (
      <span
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-white"
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full bg-ink/10 object-cover"
    />
  );
}
