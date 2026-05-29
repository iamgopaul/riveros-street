/**
 * Google reviews.
 *
 * These are PLACEHOLDER samples — replace `REVIEWS` with the real ones.
 * Two ways to populate:
 *   1) Paste real reviews here (quick, static).
 *   2) Live pull via the Google Places API — set GOOGLE_PLACES_API_KEY and
 *      the place_id, then fetch in a Server Component. The place lives at the
 *      Google URL below (CID 0x8893dd1191ceaaf3:0x853782ebda7a476).
 */
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/?q=place_id:&query=Rivero%27s+Street+Freeport+FL";

export const GOOGLE_REVIEWS_URL = "https://share.google/2yCfHQ61NYwbv46aY";

export type Review = {
  author: string;
  rating: number; // 1–5
  text: string;
  date?: string;
};

/** Aggregate shown in the heading — update to match the real Google rating. */
export const RATING = { average: 4.9, count: 510 };

export const REVIEWS: Review[] = [
  {
    author: "Google Review",
    rating: 5,
    text: "Best arepas outside of Venezuela. The reina pepiada is the real deal and the line moves fast.",
  },
  {
    author: "Google Review",
    rating: 5,
    text: "Found this truck by accident in Freeport and now I'm here every weekend. The tequeños are addictive.",
  },
  {
    author: "Google Review",
    rating: 5,
    text: "Authentic Venezuelan street food and a friendly welcome at the window. The pabellón plate is generous.",
  },
];
