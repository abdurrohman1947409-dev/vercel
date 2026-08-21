import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Server Rules",
  description:
    "Read and follow the VerleSMP server rules. Violations may result in mutes, kicks, or permanent bans.",
};

const RULE_SECTIONS = [
  {
    emoji: "💬",
    title: "Chat & Communication",
    rules: [
      "No spamming, excessive caps, or repeating messages.",
      "No hate speech, racism, or targeted harassment of any player.",
      "No advertising other servers or Discord servers.",
      "Keep chat in English or Bangla only. Other languages in DMs.",
      "No sharing personal information (doxxing) of other players.",
    ],
  },
  {
    emoji: "⚔️",
    title: "Gameplay & PvP",
    rules: [
      "No hacking, cheating, or using disallowed mods. Allowed mods: OptiFine, Sodium, Iris, Minimaps (no entity radar).",
      "No spawn killing or trapping players in unfair locations.",
      "No exploiting bugs or duplication glitches. Report them to staff.",
      "No griefing player bases, farms, or builds without consent.",
      "No trapping other players inside your base to kill them repeatedly.",
    ],
  },
  {
    emoji: "🏗️",
    title: "Building & Land",
    rules: [
      "Do not build within 100 blocks of another player's base without their permission.",
      "No offensive, inappropriate, or NSFW builds.",
      "Clean up your temporary structures. No leaving floating trees or half-built structures.",
      "Claim your land using the claim system to protect it. Unclaimed land is unprotected.",
    ],
  },
  {
    emoji: "🪙",
    title: "Economy & Trading",
    rules: [
      "No scamming other players in trades. Agree on terms before trading.",
      "No price fixing or market manipulation to harm the economy.",
      "All real-money trades must go through the official store only.",
      "Item duplication bugs must be reported — not exploited for profit.",
    ],
  },
  {
    emoji: "👮",
    title: "Staff & Admin",
    rules: [
      "Respect all staff members. Disagreements should be raised via Discord tickets, not in chat.",
      "Do not impersonate staff members or claim to have admin powers.",
      "Staff decisions are final in-game. Appeals may be submitted via Discord.",
      "Do not ask staff for free items, ranks, or special treatment.",
    ],
  },
  {
    emoji: "🛒",
    title: "Store & Payments",
    rules: [
      "All purchases are final. Chargebacks will result in a permanent ban.",
      "In-game delivery is done by admins. Allow up to 24 hours for delivery.",
      "For fastest delivery, open a Discord ticket after paying.",
      "Do not share your order details or TrxID publicly in chat.",
    ],
  },
];

const PUNISHMENTS = [
  { level: "1st Offence", color: "#ffd700", action: "Verbal warning in chat" },
  { level: "2nd Offence", color: "#f97316", action: "30-minute mute / 1-hour kick" },
  { level: "3rd Offence", color: "#ff4d6d", action: "24-hour temporary ban" },
  { level: "Severe / Cheat", color: "#7f5af0", action: "Permanent ban — no appeal" },
];

export default function RulesPage() {
  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#f0f6fc] tracking-tight flex items-center gap-3">
          <ShieldAlert size={28} className="text-[#ff4d6d]" />
          Server Rules
        </h1>
        <p className="text-[#8b949e] mt-2 leading-relaxed">
          By joining <span className="text-[#00ffab] font-semibold">VerleSMP</span>, you agree to
          follow these rules. Ignorance is not an excuse. Read carefully.
        </p>
      </div>

      {/* Punishment table */}
      <div className="glass p-5 border border-[#ff4d6d]/15 space-y-3">
        <h2 className="font-bold text-[#f0f6fc] text-base">⚖️ Punishment Ladder</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {PUNISHMENTS.map((p) => (
            <div
              key={p.level}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}80` }}
              />
              <div>
                <p className="text-xs font-bold text-[#f0f6fc]">{p.level}</p>
                <p className="text-xs text-[#8b949e]">{p.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rule sections */}
      <div className="flex flex-col gap-6">
        {RULE_SECTIONS.map((section, sIdx) => (
          <section key={section.title} className="glass p-6 border border-white/8">
            <h2 className="text-lg font-bold text-[#f0f6fc] mb-4 flex items-center gap-2">
              <span>{section.emoji}</span>
              {section.title}
            </h2>
            <ol className="flex flex-col gap-2.5">
              {section.rules.map((rule, rIdx) => (
                <li key={rIdx} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-[#8b949e]">
                    {sIdx * 10 + rIdx + 1}
                  </span>
                  <span className="text-[#8b949e] leading-relaxed pt-0.5">{rule}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="glass px-5 py-4 border border-[#00ffab]/15 text-sm text-[#8b949e] leading-relaxed">
        📌 Rules are subject to change at any time. Follow our Discord server for rule updates.
        If you witness a player breaking rules, use{" "}
        <code className="font-mono text-[#00ffab] bg-[#00ffab]/10 px-1.5 py-0.5 rounded">/report [IGN] [reason]</code>{" "}
        in-game.
      </div>
    </div>
  );
}
