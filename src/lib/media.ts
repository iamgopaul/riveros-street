/**
 * Social video embeds for the Media page.
 *
 * NOTE: There is no way to auto-pull a live feed from TikTok / Instagram /
 * Facebook without each platform's official API (business account + access
 * tokens + app review). Instead, paste the share URL of each video you want to
 * feature below and it renders as an official embed.
 *
 * Where to get the URL:
 *   TikTok    — open the video → Share → Copy link
 *   Instagram — open the reel/post → ··· → Copy link
 *   Facebook  — open the video → ··· → Copy link
 *
 * The samples below are placeholders — replace them with your real links.
 */
export type MediaPlatform = "tiktok" | "instagram" | "facebook" | "video";

export type MediaItem = {
  platform: MediaPlatform;
  /** Embed share-URL for socials, or a local file path (e.g. "/media/clip.mp4") for `video`. */
  url: string;
  /** Optional aspect override, e.g. "aspect-[9/16]" or "aspect-square". */
  aspect?: string;
};

export const MEDIA: MediaItem[] = [
  { platform: "tiktok", url: "https://www.tiktok.com/@riverosstreet/video/7461343096844913951" },
  { platform: "tiktok", url: "https://www.tiktok.com/@riverosstreet/video/7464226473793113374" },
  { platform: "tiktok", url: "https://www.tiktok.com/@riverosstreet/video/7417605399123119391" },

  // For a video that plays LIVE (dark, autoplay, looping, no click): download the
  // clip as .mp4, drop it in public/media/, and add it as a "video" item, e.g.
  // { platform: "video", url: "/media/arepas.mp4", aspect: "aspect-[9/16]" },

  // { platform: "facebook", url: "https://www.facebook.com/61564006996188/videos/0000000000000000/" },
];

/**
 * Build an official embed iframe src from a share URL. Returns null if the URL
 * doesn't look like a real video (e.g. an untouched placeholder).
 */
export function embedSrc(item: MediaItem): string | null {
  const { platform, url } = item;

  if (platform === "tiktok") {
    const id = url.match(/video\/(\d+)/)?.[1];
    if (!id || /^0+$/.test(id)) return null;
    // Bare player (black background) instead of embed/v2's white card.
    // autoplay+muted is required for browsers to allow playback; loop keeps it live.
    return `https://www.tiktok.com/player/v1/${id}?description=0&music_info=0&rel=0&autoplay=1&loop=1&muted=1`;
  }

  if (platform === "instagram") {
    const m = url.match(/instagram\.com\/(reel|p|tv)\/([^/?#]+)/);
    if (!m || m[2].startsWith("XXXX")) return null;
    return `https://www.instagram.com/${m[1]}/${m[2]}/embed`;
  }

  if (platform === "facebook") {
    if (url.includes("0000000000")) return null;
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
  }

  return null;
}

/** TikTok / Instagram / self-hosted clips are vertical; Facebook is landscape. */
export function aspectClass(platform: MediaPlatform): string {
  return platform === "facebook" ? "aspect-video" : "aspect-[9/16]";
}
