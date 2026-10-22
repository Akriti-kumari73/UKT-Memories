import { useState, useEffect } from "react";
import { getWishes, submitWish, heartWish } from "../services/api";

const WishesSection = () => {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("💖");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const emojis = ["💖", "✨", "🌸", "🥂", "🎉", "💕", "⭐", "🦋"];

  useEffect(() => {
    let isMounted = true;
    getWishes().then((data) => {
      if (isMounted && data) {
        setWishes(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    const newWish = await submitWish({ name, message, emoji });
    setSubmitting(false);

    if (newWish) {
      setWishes((prev) => [newWish, ...prev]);
      setName("");
      setMessage("");
      setSuccessMsg("Your wish has been posted to UKT's wall! ♡");
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };

  const handleHeart = async (id) => {
    const res = await heartWish(id);
    if (res && res.success) {
      setWishes((prev) =>
        prev.map((w) => (w.id === id ? { ...w, hearts: res.hearts } : w))
      );
    }
  };

  return (
    <section
      id="wishes"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#08090d] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-300 font-light">
            ✦ Wall of Love ✦
          </p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl text-white">
            Leave a Wish for{" "}
            <span className="text-violet-300 font-serif">UKT</span>
          </h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <span className="h-px w-10 bg-violet-400/30" />
            <span className="text-violet-300 text-lg">♡</span>
            <span className="h-px w-10 bg-violet-400/30" />
          </div>
          <p className="mt-4 text-white/60 text-sm sm:text-base font-light">
            Drop a heartfelt note, wish, or sweet memory. Every word stays
            treasured forever.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= WISH SUBMISSION FORM ================= */}
          <div className="lg:col-span-5 bg-[#0e0f18]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <h3 className="font-serif text-xl sm:text-2xl text-white flex items-center gap-2">
              <span>Write a Note</span>
              <span className="text-rose-400 text-sm">♥</span>
            </h3>
            <p className="text-xs text-white/50 mt-1 mb-6">
              Saved directly to UKT's memories database.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-light">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bestie / Anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.08] transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-light">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share a wish, a compliment, or a sweet memory..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.08] transition resize-none"
                />
              </div>

              {/* Emoji selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5 font-light">
                  Choose a Vibe
                </label>
                <div className="flex gap-2 flex-wrap">
                  {emojis.map((em) => (
                    <button
                      type="button"
                      key={em}
                      onClick={() => setEmoji(em)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                        emoji === em
                          ? "bg-violet-600/40 border-2 border-violet-400 scale-110 shadow-md"
                          : "bg-white/5 border border-white/10 hover:bg-white/15"
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium tracking-wide shadow-lg shadow-violet-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {submitting ? "Posting Note..." : "Send Note with Love ♡"}
              </button>

              {successMsg && (
                <p className="text-center text-xs text-violet-300 font-light mt-2 animate-fadeIn">
                  {successMsg}
                </p>
              )}
            </form>
          </div>

          {/* ================= WISHES CARDS GRID ================= */}
          <div className="lg:col-span-7 space-y-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin">
            {wishes.length === 0 ? (
              <div className="text-center py-12 text-white/40">
                Be the first one to leave a sweet wish! ♡
              </div>
            ) : (
              wishes.map((w) => (
                <div
                  key={w.id}
                  className="group relative p-5 rounded-2xl bg-[#0e0f18]/70 border border-white/10 hover:border-violet-400/30 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/5">
                        {w.emoji || "💖"}
                      </span>
                      <div>
                        <h4 className="font-serif text-white text-base font-medium">
                          {w.name}
                        </h4>
                        <span className="text-[11px] text-white/40 font-light">
                          {w.date}
                        </span>
                      </div>
                    </div>

                    {/* Heart Counter Button */}
                    <button
                      onClick={() => handleHeart(w.id)}
                      className="px-3 py-1 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/40 text-xs text-white/80 hover:text-rose-200 flex items-center gap-1.5 transition-all"
                    >
                      <span className="text-rose-400 text-sm">♥</span>
                      <span>{w.hearts || 0}</span>
                    </button>
                  </div>

                  <p className="mt-3.5 text-white/75 text-sm font-light leading-relaxed pl-1">
                    "{w.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
