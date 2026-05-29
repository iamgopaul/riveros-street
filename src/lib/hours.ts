/** Opening hours, one row per day. Day names are translated via t(`day.${dayKey}`). */
export type DayHours = { dayKey: string; time: string };

export const HOURS: DayHours[] = [
  { dayKey: "mon", time: "11 AM to 10 PM" },
  { dayKey: "tue", time: "11 AM to 10 PM" },
  { dayKey: "wed", time: "11 AM to 10 PM" },
  { dayKey: "thu", time: "11 AM to 10 PM" },
  { dayKey: "fri", time: "11 AM to 11 PM" },
  { dayKey: "sat", time: "11 AM to 11 PM" },
  { dayKey: "sun", time: "11 AM to 10 PM" },
];
