import { redirect } from "next/navigation";
import { eatPath } from "@/lib/sites";

// Menu and ordering are now one page. Keep this route working for old links.
export default function OrderPage() {
  redirect(eatPath("/menu"));
}
