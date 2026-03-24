export const THEME = {
  Prime: {
    color: "from-blue-400 to-cyan-300", dot: "bg-blue-400", accent: "text-blue-600",
    bar: "bg-blue-400", btn: "bg-blue-500 hover:bg-blue-600", shadow: "shadow-blue-500/20",
    featured: false, emoji: "🔰",
    moreBtn: "text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-100",
  },
  Dynamic: {
    color: "from-slate-400 to-slate-300", dot: "bg-slate-400", accent: "text-slate-500",
    bar: "bg-slate-400", btn: "bg-slate-900 hover:bg-slate-700", shadow: "shadow-slate-500/20",
    featured: false, emoji: "⚡",
    moreBtn: "text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200",
  },
  Gold: {
    color: "from-yellow-500 to-amber-600", dot: "bg-yellow-500", accent: "text-amber-700",
    bar: "bg-yellow-500", btn: "bg-amber-400 hover:bg-amber-500", shadow: "shadow-amber-400/30",
    featured: true, emoji: "⭐",
    moreBtn: "text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-200",
  },
  Diamond: {
    color: "from-indigo-500 to-purple-500", dot: "bg-indigo-500", accent: "text-indigo-600",
    bar: "bg-indigo-500", btn: "bg-indigo-600 hover:bg-indigo-700", shadow: "shadow-indigo-500/20",
    featured: false, emoji: "💎",
    moreBtn: "text-indigo-500 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-indigo-100",
  },
};

export const DEFAULT_THEME = THEME.Dynamic;