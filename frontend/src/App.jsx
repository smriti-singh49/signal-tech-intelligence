import { useState } from "react";
import {
  Home, Search, Bell, Bookmark, User, Settings,
  Heart, MessageCircle, Share2, MoreHorizontal,
  Zap, ExternalLink, TrendingUp, Bot, BarChart2,
  Flame, Star, Hash, ChevronRight, Radio, Shield,
  Cloud, Code2, Cpu, Globe, GitBranch, Filter
} from "lucide-react";

// ─────────────────────────────────────────────────
//  MOCK DATA
// ─────────────────────────────────────────────────

const ARTICLES = [
  {
    id: 1,
    source: "The Verge",
    sourceHandle: "@verge",
    sourceInitials: "TV",
    sourceGradient: "from-red-500 to-orange-500",
    author: "Nilay Patel",
    timestamp: "47m",
    title: "Anthropic's Claude 4 Sets New Records Across Every Major AI Benchmark",
    description:
      "Claude 4 outperforms all competitors on MMLU, HumanEval, and GSM8K while introducing 'constitutional steering' — a breakthrough making AI reasoning more transparent and auditable at scale.",
    tags: ["AI", "Anthropic", "LLMs"],
    tagColors: {
      AI: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      Anthropic: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      LLMs: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    likes: 3241,
    comments: 487,
    bookmarks: 1829,
    readTime: "5 min",
    isBreaking: true,
    isTrending: false,
  },
  {
    id: 2,
    source: "TechCrunch",
    sourceHandle: "@techcrunch",
    sourceInitials: "TC",
    sourceGradient: "from-green-500 to-emerald-600",
    author: "Connie Loizos",
    timestamp: "2h",
    title: "Y Combinator W25: 47% of New Startups Are AI-Native From Day One",
    description:
      "YC's latest batch signals a structural shift in how founders build companies. Infrastructure tooling, vertical AI agents, and developer productivity dominate the cohort.",
    tags: ["Startups", "YC", "AI"],
    tagColors: {
      Startups: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      YC: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      AI: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    },
    likes: 1847,
    comments: 203,
    bookmarks: 644,
    readTime: "3 min",
    isBreaking: false,
    isTrending: true,
  },
  {
    id: 3,
    source: "Ars Technica",
    sourceHandle: "@arstechnica",
    sourceInitials: "AT",
    sourceGradient: "from-red-700 to-red-500",
    author: "Scharon Harding",
    timestamp: "3h",
    title: "NVIDIA Blackwell Ultra GPUs Begin Shipping to Hyperscalers — Performance Is Staggering",
    description:
      "Early benchmarks from Azure and AWS show 4.2× improvement over H100s on transformer inference workloads. The memory bandwidth jump is rewriting what's possible for real-time AI applications.",
    tags: ["NVIDIA", "Hardware", "Cloud"],
    tagColors: {
      NVIDIA: "bg-green-500/20 text-green-300 border-green-500/30",
      Hardware: "bg-zinc-500/20 text-zinc-300 border-zinc-700",
      Cloud: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    },
    likes: 2104,
    comments: 318,
    bookmarks: 892,
    readTime: "6 min",
    isBreaking: false,
    isTrending: true,
  },
  {
    id: 4,
    source: "Hacker News",
    sourceHandle: "@hackernews",
    sourceInitials: "HN",
    sourceGradient: "from-orange-500 to-yellow-500",
    author: "dang",
    timestamp: "4h",
    title: "Show HN: Fully Local RAG Pipeline Achieving Sub-200ms Retrieval on M3 MacBook Air",
    description:
      "Built with Ollama + LlamaIndex + a custom chunking strategy. 50GB private knowledge base, no API calls, no data leaves the machine. Full writeup with benchmarks included.",
    tags: ["Open Source", "RAG", "LocalAI"],
    tagColors: {
      "Open Source": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      RAG: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      LocalAI: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    likes: 4829,
    comments: 731,
    bookmarks: 2104,
    readTime: "8 min",
    isBreaking: false,
    isTrending: true,
  },
  {
    id: 5,
    source: "MIT Tech Review",
    sourceHandle: "@techreview",
    sourceInitials: "MT",
    sourceGradient: "from-red-700 to-rose-500",
    author: "Melissa Heikkilä",
    timestamp: "6h",
    title: "EU AI Act Technical Standards Finalized — What Developers Must Do Before Enforcement",
    description:
      "Three months before enforcement, ENISA published detailed technical requirements for model cards, incident reporting, and high-risk system classification. Here's the full breakdown.",
    tags: ["Policy", "EU AI Act", "Regulation"],
    tagColors: {
      Policy: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      "EU AI Act": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      Regulation: "bg-zinc-500/20 text-zinc-400 border-zinc-700",
    },
    likes: 987,
    comments: 241,
    bookmarks: 715,
    readTime: "7 min",
    isBreaking: false,
    isTrending: false,
  },
  {
    id: 6,
    source: "Wired",
    sourceHandle: "@wired",
    sourceInitials: "WR",
    sourceGradient: "from-zinc-600 to-zinc-400",
    author: "Steven Levy",
    timestamp: "8h",
    title: "Inside Mistral's Bet Against Silicon Valley: How a Paris Lab Plans to Win the AI Race",
    description:
      "With a lean team of 80 researchers and a European-first distribution model, Mistral is taking on OpenAI and Google with a radically different thesis about what frontier AI should look like.",
    tags: ["Startups", "Open Source", "Europe"],
    tagColors: {
      Startups: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      "Open Source": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      Europe: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    likes: 1563,
    comments: 189,
    bookmarks: 801,
    readTime: "10 min",
    isBreaking: false,
    isTrending: false,
  },
  {
    id: 7,
    source: "Krebs on Security",
    sourceHandle: "@krebsonsec",
    sourceInitials: "KS",
    sourceGradient: "from-red-800 to-red-600",
    author: "Brian Krebs",
    timestamp: "10h",
    title: "Major SaaS Provider Breach Exposes API Keys for 12,000 Enterprise Customers",
    description:
      "A supply-chain attack via a compromised CI/CD dependency allowed exfiltration of environment variables across customer pipelines. Rotation guidance and indicators of compromise inside.",
    tags: ["Cybersecurity", "Supply Chain", "Breach"],
    tagColors: {
      Cybersecurity: "bg-red-500/20 text-red-300 border-red-500/30",
      "Supply Chain": "bg-orange-500/20 text-orange-300 border-orange-500/30",
      Breach: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    },
    likes: 3918,
    comments: 624,
    bookmarks: 2891,
    readTime: "9 min",
    isBreaking: false,
    isTrending: true,
  },
];

const RECOMMENDED_ARTICLES = [
  {
    id: 101,
    source: "InfoQ",
    sourceInitials: "IQ",
    sourceGradient: "from-blue-500 to-indigo-600",
    timestamp: "1h",
    title: "Scaling Transformer Architectures Beyond 1 Trillion Parameters: Production Lessons",
    tags: ["AI", "MLOps"],
    tagColors: {
      AI: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      MLOps: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    likes: 892,
    comments: 67,
    bookmarks: 445,
    readTime: "9 min",
    matchScore: 97,
    matchReason: "Matches your AI & ML reading history",
  },
  {
    id: 102,
    source: "The Register",
    sourceInitials: "TR",
    sourceGradient: "from-zinc-600 to-zinc-500",
    timestamp: "3h",
    title: "Kubernetes 2.0 Proposal: What Radical Simplification Would Actually Mean for Ops Teams",
    tags: ["Cloud", "DevOps", "Open Source"],
    tagColors: {
      Cloud: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      DevOps: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      "Open Source": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    likes: 1243,
    comments: 178,
    bookmarks: 534,
    readTime: "5 min",
    matchScore: 93,
    matchReason: "Similar to your saved Cloud articles",
  },
  {
    id: 103,
    source: "Stratechery",
    sourceInitials: "ST",
    sourceGradient: "from-teal-500 to-cyan-600",
    timestamp: "5h",
    title: "The API Economy's Second Act: Why Developer Platforms Are Eating Software Again",
    tags: ["Startups", "Strategy", "Dev Tools"],
    tagColors: {
      Startups: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      Strategy: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      "Dev Tools": "bg-violet-500/20 text-violet-300 border-violet-500/30",
    },
    likes: 2107,
    comments: 289,
    bookmarks: 1089,
    readTime: "11 min",
    matchScore: 88,
    matchReason: "Based on your Startups tag affinity",
  },
];

const TRENDING_TOPICS = [
  { rank: 1, tag: "GPT5", category: "Artificial Intelligence", posts: "89.4K", hot: true },
  { rank: 2, tag: "BlackwellGPU", category: "Hardware · NVIDIA", posts: "42.1K", hot: true },
  { rank: 3, tag: "YCW25", category: "Startups · Y Combinator", posts: "28.7K", hot: false },
  { rank: 4, tag: "EUAIAct", category: "Policy & Regulation", posts: "21.3K", hot: false },
  { rank: 5, tag: "OpenSourceAI", category: "Open Source", posts: "18.9K", hot: false },
  { rank: 6, tag: "Cybersecurity", category: "Security", posts: "15.2K", hot: false },
  { rank: 7, tag: "QuantumComputing", category: "Research", posts: "12.8K", hot: false },
];

const SUGGESTED_SOURCES = [
  {
    name: "Andrej Karpathy",
    handle: "@karpathy",
    initials: "AK",
    gradient: "from-violet-500 to-purple-700",
    desc: "AI Researcher",
  },
  {
    name: "Swyx",
    handle: "@swyx",
    initials: "SW",
    gradient: "from-sky-500 to-blue-700",
    desc: "AI Engineer & Writer",
  },
  {
    name: "Simon Willison",
    handle: "@simonw",
    initials: "SL",
    gradient: "from-emerald-500 to-teal-700",
    desc: "Django creator · AI tools",
  },
];

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Explore" },
  { icon: Bell, label: "Alerts" },
  { icon: Bookmark, label: "Saved" },
  { icon: BarChart2, label: "Insights" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

const FEED_TABS = ["For You", "Following", "AI & ML", "Startups", "Dev Tools", "Security"];

// ─────────────────────────────────────────────────
//  UTILITY
// ─────────────────────────────────────────────────

function fmtCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

// ─────────────────────────────────────────────────
//  SUB-COMPONENTS
// ─────────────────────────────────────────────────

function Avatar({ initials, gradient, size = "sm" }) {
  const sz =
    size === "lg"
      ? "w-11 h-11 text-sm"
      : size === "md"
      ? "w-9 h-9 text-xs"
      : "w-8 h-8 text-xs";
  return (
    <div
      className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-black text-white flex-shrink-0 select-none`}
    >
      {initials}
    </div>
  );
}

function TagPill({ tag, colorClass }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide ${
        colorClass || "bg-zinc-800 text-zinc-400 border-zinc-700"
      }`}
    >
      #{tag}
    </span>
  );
}

function BreakingBadge() {
  return (
    <span className="bg-red-500/15 text-red-400 border border-red-500/30 text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-widest uppercase">
      BREAKING
    </span>
  );
}

function TrendingBadge() {
  return (
    <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-widest uppercase flex items-center gap-0.5">
      <Flame size={8} /> HOT
    </span>
  );
}

// ─────────────────────────────────────────────────
//  LEFT SIDEBAR
// ─────────────────────────────────────────────────

function LeftSidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="w-[64px] xl:w-[220px] flex-shrink-0 border-r border-zinc-800/50 flex flex-col h-screen sticky top-0 px-2 xl:px-3 py-4">
      {/* Logo */}
      <div className="px-2 xl:px-3 mb-6 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
          <Zap size={17} className="text-white" fill="white" />
        </div>
        <div className="hidden xl:block">
          <p className="text-[16px] font-black tracking-tight text-white leading-none">SIGNAL</p>
          <p className="text-[9px] text-zinc-500 font-semibold tracking-widest uppercase">Tech Intelligence</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map(({ icon: Icon, label }) => {
          const active = activeNav === label;
          return (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3.5 px-2 xl:px-3 py-2.5 rounded-xl transition-all group text-left
                ${active
                  ? "bg-violet-500/10 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"}`}
            >
              <Icon
                size={20}
                className={`flex-shrink-0 ${
                  active ? "text-violet-400" : "group-hover:text-violet-400 transition-colors"
                }`}
              />
              <span className="hidden xl:block text-[14px] font-semibold">{label}</span>
              {label === "Alerts" && (
                <span className="hidden xl:flex ml-auto w-4 h-4 bg-violet-500 rounded-full text-[9px] text-white font-black items-center justify-center">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User card */}
      <div className="mt-4 px-2 xl:px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer flex items-center gap-2.5 transition-all group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-600 flex items-center justify-center font-black text-white text-xs flex-shrink-0">
          JD
        </div>
        <div className="hidden xl:flex flex-1 min-w-0 flex-col">
          <p className="text-[13px] font-bold text-white truncate">John Developer</p>
          <p className="text-[11px] text-zinc-500 truncate">@johndev</p>
        </div>
        <MoreHorizontal
          size={15}
          className="hidden xl:block text-zinc-600 group-hover:text-zinc-400 flex-shrink-0"
        />
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────
//  NEWS CARD
// ─────────────────────────────────────────────────

function NewsCard({ article }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((p) => !p);
    setLikeCount((p) => (liked ? p - 1 : p + 1));
  };
  const toggleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked((p) => !p);
  };

  return (
    <article className="border-b border-zinc-800/50 px-4 py-4 hover:bg-white/[0.015] transition-colors cursor-pointer group">
      <div className="flex gap-3">
        <Avatar initials={article.sourceInitials} gradient={article.sourceGradient} size="md" />

        <div className="flex-1 min-w-0">
          {/* Meta row */}
          <div className="flex items-center justify-between mb-1.5 gap-2">
            <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1">
              <span className="text-[13px] font-bold text-white">{article.source}</span>
              <span className="text-[11px] text-zinc-500">{article.sourceHandle}</span>
              <span className="text-zinc-700">·</span>
              <span className="text-[11px] text-zinc-500">{article.timestamp}</span>
              {article.isBreaking && <BreakingBadge />}
              {article.isTrending && <TrendingBadge />}
            </div>
            <button className="p-1 rounded-full hover:bg-white/[0.06] text-zinc-700 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
              <MoreHorizontal size={15} />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-[14px] font-bold text-white leading-snug mb-2 group-hover:text-violet-200 transition-colors">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-[12px] text-zinc-400 leading-relaxed mb-3 line-clamp-2">
            {article.description}
          </p>

          {/* Tags + read time */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {article.tags.map((tag) => (
              <TagPill key={tag} tag={tag} colorClass={article.tagColors?.[tag]} />
            ))}
            {article.readTime && (
              <span className="text-[10px] text-zinc-600 font-medium">· {article.readTime}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1.5 text-zinc-600 hover:text-sky-400 transition-colors">
                <MessageCircle size={14} />
                <span className="text-[11px] font-semibold">{fmtCount(article.comments)}</span>
              </button>
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1.5 transition-colors ${
                  liked ? "text-pink-400" : "text-zinc-600 hover:text-pink-400"
                }`}
              >
                <Heart size={14} className={liked ? "fill-pink-400" : ""} />
                <span className="text-[11px] font-semibold">{fmtCount(likeCount)}</span>
              </button>
              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-1.5 transition-colors ${
                  bookmarked ? "text-violet-400" : "text-zinc-600 hover:text-violet-400"
                }`}
              >
                <Bookmark size={14} className={bookmarked ? "fill-violet-400" : ""} />
                <span className="text-[11px] font-semibold">{fmtCount(article.bookmarks)}</span>
              </button>
            </div>
            <button className="text-zinc-600 hover:text-violet-400 transition-colors p-1 rounded-full hover:bg-violet-500/10">
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────
//  RECOMMENDED CARD  (ML-powered)
// ─────────────────────────────────────────────────

function RecommendedCard({ article }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const scoreColor =
    article.matchScore >= 95
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
      : article.matchScore >= 90
      ? "text-violet-300 border-violet-500/30 bg-violet-500/10"
      : "text-sky-300 border-sky-500/30 bg-sky-500/10";

  return (
    <article className="border border-zinc-800/60 rounded-2xl p-4 hover:border-violet-500/25 hover:bg-violet-500/[0.025] transition-all cursor-pointer group">
      {/* Top row: score + timestamp */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 border text-[11px] font-bold ${scoreColor}`}
        >
          <Bot size={11} />
          {article.matchScore}% match
        </div>
        <span className="text-[11px] text-zinc-600">{article.timestamp}</span>
      </div>

      {/* Source + title */}
      <div className="flex gap-2.5 mb-3">
        <Avatar initials={article.sourceInitials} gradient={article.sourceGradient} size="sm" />
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-zinc-500 mb-0.5">{article.source}</p>
          <h4 className="text-[13px] font-bold text-white leading-snug group-hover:text-violet-200 transition-colors">
            {article.title}
          </h4>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {article.tags.map((tag) => (
          <TagPill key={tag} tag={tag} colorClass={article.tagColors?.[tag]} />
        ))}
        <span className="text-[10px] text-zinc-600">· {article.readTime}</span>
      </div>

      {/* Bottom: reason + actions */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
          <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
          {article.matchReason}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked((p) => !p); }}
            className={`transition-colors ${liked ? "text-pink-400" : "text-zinc-600 hover:text-pink-400"}`}
          >
            <Heart size={13} className={liked ? "fill-pink-400" : ""} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setBookmarked((p) => !p); }}
            className={`transition-colors ${bookmarked ? "text-violet-400" : "text-zinc-600 hover:text-violet-400"}`}
          >
            <Bookmark size={13} className={bookmarked ? "fill-violet-400" : ""} />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────
//  MAIN FEED
// ─────────────────────────────────────────────────

function MainFeed() {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <main className="flex-1 min-w-0 border-r border-zinc-800/50 flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-zinc-800/50">
        <div className="px-4 pt-3 pb-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[17px] font-black text-white">Feed</h1>
            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-[12px] font-semibold transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/[0.05]">
              <Filter size={13} />
              Filter
            </button>
          </div>
          {/* Tabs */}
          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {FEED_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 pb-3 pt-1 text-[12px] font-bold border-b-2 transition-all
                  ${activeTab === tab
                    ? "border-violet-500 text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article feed */}
      <div>
        {ARTICLES.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* ── ML Recommended Section ── */}
      <section className="border-t-4 border-zinc-800/60 px-4 pt-6 pb-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center">
              <Bot size={12} className="text-white" />
            </div>
            <h2 className="text-[15px] font-black text-white">Recommended For You</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 via-violet-500/10 to-transparent" />
          <span className="text-[9px] font-black text-violet-300 bg-violet-500/15 border border-violet-500/25 px-2 py-0.5 rounded-full tracking-widest uppercase">
            ML POWERED
          </span>
        </div>

        <p className="text-[11px] text-zinc-500 mb-5 pl-0.5">
          Personalized via TF-IDF vectorization + cosine similarity on your reading history.
        </p>

        {/* Recommendation cards */}
        <div className="space-y-3">
          {RECOMMENDED_ARTICLES.map((article) => (
            <RecommendedCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load more */}
        <button className="w-full mt-4 py-3 rounded-2xl border border-zinc-800 hover:border-violet-500/40 text-[13px] font-semibold text-zinc-500 hover:text-violet-400 hover:bg-violet-500/[0.04] transition-all flex items-center justify-center gap-2">
          <ChevronRight size={15} />
          Load More Recommendations
        </button>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────
//  RIGHT SIDEBAR
// ─────────────────────────────────────────────────

function TrendingItem({ item }) {
  return (
    <div className="px-4 py-2.5 hover:bg-white/[0.03] cursor-pointer transition-colors group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-zinc-600 font-medium mb-0.5 truncate">{item.category}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-bold text-white group-hover:text-violet-300 transition-colors truncate">
              #{item.tag}
            </span>
            {item.hot && <Flame size={11} className="text-orange-400 flex-shrink-0 fill-orange-400" />}
          </div>
          <p className="text-[10px] text-zinc-600 mt-0.5">{item.posts} discussions</p>
        </div>
        <span className="text-[11px] text-zinc-700 font-bold flex-shrink-0">#{item.rank}</span>
      </div>
    </div>
  );
}

function RightSidebar() {
  const [search, setSearch] = useState("");

  return (
    <aside className="w-[280px] flex-shrink-0 h-screen sticky top-0 overflow-y-auto px-3 py-4 space-y-4"
      style={{ scrollbarWidth: "none" }}>

      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
        <input
          type="text"
          placeholder="Search SIGNAL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-800/50 border border-zinc-700/40 rounded-full pl-8 pr-4 py-2 text-[12px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-zinc-800 transition-all"
        />
      </div>

      {/* Trending Topics */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        <div className="px-4 pt-3.5 pb-2.5 border-b border-zinc-800/40 flex items-center gap-2">
          <TrendingUp size={13} className="text-violet-400" />
          <h3 className="text-[13px] font-black text-white">Trending in Tech</h3>
        </div>
        <div className="divide-y divide-zinc-800/40">
          {TRENDING_TOPICS.map((item) => (
            <TrendingItem key={item.tag} item={item} />
          ))}
        </div>
        <button className="w-full px-4 py-3 text-left hover:bg-white/[0.03] transition-colors">
          <span className="text-[12px] text-violet-400 font-semibold">Show all trending →</span>
        </button>
      </div>

      {/* Top Tech Voices */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        <div className="px-4 pt-3.5 pb-2.5 border-b border-zinc-800/40">
          <h3 className="text-[13px] font-black text-white">Top Tech Voices</h3>
        </div>
        <div className="divide-y divide-zinc-800/40">
          {SUGGESTED_SOURCES.map((src) => (
            <div
              key={src.handle}
              className="flex items-center gap-2.5 px-4 py-3 hover:bg-white/[0.03] cursor-pointer group"
            >
              <Avatar initials={src.initials} gradient={src.gradient} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-white truncate">{src.name}</p>
                <p className="text-[10px] text-zinc-500 truncate">{src.desc}</p>
              </div>
              <button className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-zinc-700 text-zinc-400 hover:border-violet-500/60 hover:text-violet-300 hover:bg-violet-500/10 transition-all flex-shrink-0">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ML Engine Status Card */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.07] to-indigo-500/[0.03] p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[12px] font-bold text-violet-300">ML Engine Active</span>
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
          Personalization running on TF-IDF vectorization + cosine similarity. Real-time scoring active.
        </p>

        <div className="space-y-3">
          {[
            { label: "Articles indexed", value: "1,247", color: "text-white" },
            { label: "Topic clusters", value: "24", color: "text-violet-300" },
            { label: "Model accuracy", value: "94.2%", color: "text-emerald-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-[11px] text-zinc-500">{label}</span>
              <span className={`text-[12px] font-bold ${color}`}>{value}</span>
            </div>
          ))}

          {/* Progress bar */}
          <div className="pt-1">
            <div className="flex justify-between text-[10px] text-zinc-600 mb-1.5">
              <span>Recommendation strength</span>
              <span>94.2%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-emerald-500"
                style={{ width: "94.2%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Topics you follow */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4">
        <h3 className="text-[12px] font-black text-white mb-3">Your Topic Affinities</h3>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "AI", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
            { label: "MLOps", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
            { label: "Startups", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
            { label: "Cloud", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
            { label: "Open Source", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
            { label: "Cybersecurity", color: "bg-red-500/20 text-red-300 border-red-500/30" },
            { label: "Dev Tools", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
            { label: "WebAssembly", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border cursor-pointer hover:opacity-80 transition-opacity ${color}`}
            >
              #{label}
            </span>
          ))}
          <button className="text-[10px] text-zinc-500 hover:text-violet-400 font-semibold transition-colors">
            + Edit
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-1 pb-4">
        <p className="text-[10px] text-zinc-700 leading-relaxed">
          Built with Python · TF-IDF · Cosine Similarity · React · Tailwind CSS
        </p>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────
//  APP ROOT
// ─────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <div
      className="min-h-screen bg-[#0a0a0f] text-white flex overflow-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif" }}
    >
      <LeftSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <MainFeed />
      <RightSidebar />
    </div>
  );
}
