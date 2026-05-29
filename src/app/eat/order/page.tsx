import { redirect } from "next/navigation";

// Menu and ordering are now one page. Keep this route working for old links.
export default function OrderPage() {
  redirect("/menu");
}
