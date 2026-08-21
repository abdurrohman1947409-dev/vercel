import { ShieldAlert, Users, CreditCard, Activity, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  // Mock data for the dashboard
  const stats = [
    { label: "Total Revenue (30d)", value: "৳45,200", icon: CreditCard, color: "text-[#00ffab]", bg: "bg-[#00ffab]/10" },
    { label: "Active bKash Orders", value: "12", icon: Activity, color: "text-[#ffd700]", bg: "bg-[#ffd700]/10" },
    { label: "New Players (30d)", value: "342", icon: Users, color: "text-[#7f5af0]", bg: "bg-[#7f5af0]/10" },
  ];

  const pendingOrders = [
    { id: "BK-4921", player: "Notch", items: "MVP+ Rank", trxId: "9J2A4KX1", amount: "৳2,500", time: "10m ago" },
    { id: "BK-4922", player: "Dream", items: "Legendary Key x5", trxId: "8H1B3JY9", amount: "৳500", time: "1h ago" },
    { id: "BK-4923", player: "Techno", items: "10,000 Coins", trxId: "7G9C2HZ8", amount: "৳550", time: "2h ago" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#f0f6fc] flex items-center gap-3">
            <ShieldAlert size={28} className="text-[#ff4d6d]" />
            Admin Operations Center
          </h1>
          <p className="text-[#8b949e] mt-2">Manage store orders, review bKash transactions, and monitor server economy.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-[#f0f6fc] hover:bg-white/5 transition-colors">
            Server Settings
          </button>
          <button className="btn-neon-purple text-sm px-6">
            Broadcast Message
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl flex items-center gap-5">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-[#8b949e] font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-extrabold text-[#f0f6fc] mt-1 font-mono">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Pending Orders Table (2 columns wide) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[#f0f6fc] text-xl flex items-center gap-2">
                <Activity size={20} className="text-[#ffd700]" />
                Pending bKash Verifications
              </h3>
              <span className="px-3 py-1 rounded-full bg-[#ffd700]/10 text-[#ffd700] text-xs font-bold border border-[#ffd700]/20">
                Requires Action
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/10 text-[#8b949e]">
                    <th className="pb-4 font-semibold px-2">Order ID</th>
                    <th className="pb-4 font-semibold px-2">Player</th>
                    <th className="pb-4 font-semibold px-2">TrxID / Items</th>
                    <th className="pb-4 font-semibold px-2">Amount</th>
                    <th className="pb-4 font-semibold px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 font-mono text-[#8b949e]">{order.id}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          <img src={`https://cravatar.eu/helmavatar/${order.player}/24.png`} alt="" className="w-6 h-6 rounded" />
                          <span className="font-bold text-[#f0f6fc]">{order.player}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex flex-col">
                          <span className="font-mono text-[#00b4d8] text-xs font-semibold">{order.trxId}</span>
                          <span className="text-[#8b949e] text-xs mt-0.5">{order.items}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 font-mono text-[#00ffab] font-bold">{order.amount}</td>
                      <td className="py-4 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg bg-[#00ffab]/10 text-[#00ffab] hover:bg-[#00ffab]/20 border border-[#00ffab]/20 transition-colors" title="Approve & Deliver">
                            <CheckCircle size={16} />
                          </button>
                          <button className="p-2 rounded-lg bg-[#ff4d6d]/10 text-[#ff4d6d] hover:bg-[#ff4d6d]/20 border border-[#ff4d6d]/20 transition-colors" title="Reject Transaction">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>

        {/* Right Sidebar: System Status */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-2xl flex flex-col gap-6">
            <h3 className="font-bold text-[#f0f6fc] text-lg">System Status</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm text-[#8b949e]">Minecraft Server</span>
                <span className="flex items-center gap-2 text-xs font-bold text-[#00ffab]">
                  <span className="w-2 h-2 rounded-full bg-[#00ffab] animate-pulse" /> Online
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm text-[#8b949e]">Payment Gateway</span>
                <span className="flex items-center gap-2 text-xs font-bold text-[#00ffab]">
                  <span className="w-2 h-2 rounded-full bg-[#00ffab] animate-pulse" /> Active
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-sm text-[#8b949e]">Database Sync</span>
                <span className="flex items-center gap-2 text-xs font-bold text-[#7f5af0]">
                  <span className="w-2 h-2 rounded-full bg-[#7f5af0] animate-pulse" /> Syncing
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
