import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ---- Shared TypeScript types (mirror DB schema) ---- */

export type UserRole = "admin" | "user";

export interface MCUser {
  id: string;
  email: string;
  mc_ign: string;
  coin_balance: number;
  role: UserRole;
}

export type ItemCategory = "rank" | "crate_key" | "coins";

export interface StoreItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  icon_url: string;
  description: string;
}

export type OrderStatus = "pending" | "approved" | "rejected";
export type PaymentMethod = "coins" | "manual_bkash";

export interface Order {
  id: string;
  order_id: string;
  player_ign: string;
  user_email: string;
  items: StoreItem[];
  total_price: number;
  payment_method: PaymentMethod;
  sender_number?: string;
  trx_id?: string;
  status: OrderStatus;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  tag: string;
  content: string;
  media_url?: string;
  is_pinned: boolean;
  created_at: string;
}
