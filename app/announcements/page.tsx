import type { Metadata } from "next";
import { Pin, Calendar } from "lucide-react";
import { supabase, type Announcement } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Stay up to date with the latest VerleSMP news, events, updates, and server announcements.",
};

/* ── Mock announcements for demo mode ── */
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "🎉 Season 3 has officially launched!",
    tag: "UPDATE",
    content:
      "Season 3 is now live! New world border at 10,000 blocks, new spawn, and a revamped economy. All previous inventories have been reset. Get online and claim your starter kit with /kit starter. See you on the server!",
    media_url: "",
    is_pinned: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "2",
    title: "⚠️ Scheduled Maintenance — Aug 23rd 2AM BDT",
    tag: "MAINTENANCE",
    content:
      "The server will be offline for approximately 2 hours on August 23rd starting at 2:00 AM BDT. We will be upgrading to Paper 1.21.4 and applying performance patches. Sorry for the downtime!",
    media_url: "",
    is_pinned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "3",
    title: "🗝️ Double Crate Key Weekend!",
    tag: "EVENT",
    content:
      "This weekend only (Friday–Sunday), every Crate Key purchase from the store comes with a FREE bonus key of the same type. Stock up now! Use code DOUBLEKEY at checkout for an extra 5% off.",
    media_url: "",
    is_pinned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

/* ── Tag color mapping ── */
const TAG_STYLES: Record<string, string> = {
  UPDATE: "bg-[#00ffab]/10 text-[#00ffab] border-[#00ffab]/25",
  MAINTENANCE: "bg-[#ffd700]/10 text-[#ffd700] border-[#ffd700]/25",
  EVENT: "bg-[#7f5af0]/10 text-[#7f5af0] border-[#7f5af0]/25",
  NEWS: "bg-[#00b4d8]/10 text-[#00b4d8] border-[#00b4d8]/25",
  RULES: "bg-[#ff4d6d]/10 text-[#ff4d6d] border-[#ff4d6d]/25",
};

function tagStyle(tag: string) {
  return TAG_STYLES[tag.toUpperCase()] ?? "bg-white/5 text-[#8b949e] border-white/10";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Announcement Card ── */
function AnnouncementCard({ a }: { a: Announcement }) {
  const isVideo =
    a.media_url && /\.(mp4|webm|ogg)(\?.*)?$/i.test(a.media_url);
  const isImage =
    a.media_url && /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(a.media_url);

  return (
    <article
      className={`glass relative overflow-hidden flex flex-col gap-4 p-6 border transition-all duration-200 ${
        a.is_pinned
          ? "border-[#00ffab]/30 shadow-[0_0_24px_rgba(0,255,171,0.08)]"
          : "border-white/8 hover:border-white/15"
      }`}
    >
      {/* Pinned indicator */}
      {a.is_pinned && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-[#00ffab]/10 border border-[#00ffab]/25 text-[#00ffab] text-xs font-semibold">
          <Pin size={10} />
          Pinned
        </div>
      )}

      {/* Tag + Date */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${tagStyle(a.tag)}`}
        >
          {a.tag}
        </span>
        <span className="flex items-center gap-1 text-xs text-[#8b949e]">
          <Calendar size={11} />
          {formatDate(a.created_at)}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-[#f0f6fc] leading-snug">{a.title}</h2>

      {/* Content */}
      <p className="text-[#8b949e] text-sm leading-relaxed whitespace-pre-line">{a.content}</p>

      {/* Rich Media */}
      {isVideo && (
        <video
          src={a.media_url!}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full rounded-xl border border-white/10 max-h-72 object-cover"
        />
      )}
      {isImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={a.media_url!}
          alt={a.title}
          className="w-full rounded-xl border border-white/10 max-h-72 object-cover"
          loading="lazy"
        />
      )}
    </article>
  );
}

/* ── SSR Page ── */
export default async function AnnouncementsPage() {
  let announcements: Announcement[] = [];
  let isDemo = false;

  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    announcements = data ?? [];
  } catch {
    announcements = MOCK_ANNOUNCEMENTS;
    isDemo = true;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#f0f6fc] tracking-tight">
          📢 Server Announcements
        </h1>
        <p className="text-[#8b949e] mt-2">
          Latest news, events, maintenance windows, and updates from the VerleSMP team.
        </p>
        {isDemo && (
          <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffd700]/5 border border-[#ffd700]/20 text-[#ffd700] text-xs font-medium w-fit">
            ⚠️ Demo mode — connect Supabase in{" "}
            <code className="font-mono bg-white/5 px-1 rounded">.env.local</code>{" "}
            to load live announcements.
          </div>
        )}
      </div>

      {/* Announcements list */}
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <span className="text-5xl">📭</span>
          <p className="text-[#f0f6fc] font-semibold">No announcements yet</p>
          <p className="text-[#8b949e] text-sm">Check back soon for server news.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {announcements.map((a) => (
            <AnnouncementCard key={a.id} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}
