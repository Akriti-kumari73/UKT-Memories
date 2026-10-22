const FinalSection = () => {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#08070d]
        px-6
        py-28
        text-white
        flex
        items-center
        justify-center
      "
    >

      {/* =========================================
          BACKGROUND IMAGE
      ========================================= */}

      <img
        src="/photos/bg.png"
        alt="UKT memories background"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          scale-105
          opacity-80
        "
      />

      {/* Dark cinematic overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* Purple cinematic gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-violet-950/50
          via-transparent
          to-black/75
        "
      />

      {/* Bottom fade */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-1/2
          bg-gradient-to-t
          from-[#08070d]
          via-[#08070d]/40
          to-transparent
        "
      />

      {/* Top fade */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-40
          bg-gradient-to-b
          from-[#08070d]/70
          to-transparent
        "
      />

      {/* =========================================
          PURPLE GLOW
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[450px]
          w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/15
          blur-[120px]
        "
      />

      {/* =========================================
          FLOATING STARS
      ========================================= */}

      <span
        className="
          absolute
          left-[10%]
          top-[24%]
          animate-pulse
          text-2xl
          text-violet-200/70
        "
      >
        ✦
      </span>

      <span
        className="
          absolute
          right-[13%]
          top-[28%]
          animate-pulse
          text-xl
          text-violet-200/60
        "
      >
        ✧
      </span>

      <span
        className="
          absolute
          bottom-[25%]
          left-[18%]
          animate-pulse
          text-xl
          text-violet-300/50
        "
      >
        ✦
      </span>

      <span
        className="
          absolute
          bottom-[20%]
          right-[18%]
          animate-pulse
          text-3xl
          text-violet-300/60
        "
      >
        ✧
      </span>

      {/* Small hearts */}

      <span
        className="
          absolute
          left-[20%]
          top-[40%]
          text-xl
          text-violet-300/40
        "
      >
        ♡
      </span>

      <span
        className="
          absolute
          right-[22%]
          bottom-[35%]
          text-2xl
          text-violet-300/40
        "
      >
        ♡
      </span>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-3xl
          text-center
        "
      >

        {/* Small heading */}

        <div
          className="
            mb-8
            flex
            items-center
            justify-center
            gap-4
          "
        >

          <span className="h-px w-12 bg-violet-300/60" />

          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-violet-300
            "
          >
            One last thing...
          </p>

          <span className="h-px w-12 bg-violet-300/60" />

        </div>


        {/* =========================================
            GLASS CARD
        ========================================= */}

        <div
          className="
            rounded-[2rem]
            border
            border-white/15
            bg-black/25
            px-7
            py-12
            shadow-[0_30px_100px_rgba(0,0,0,0.55)]
            backdrop-blur-[4px]
            transition-all
            duration-500
            hover:border-violet-300/30
            hover:bg-black/30
            md:px-14
            md:py-16
          "
        >

          {/* Heart circle */}

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-violet-300/30
              bg-violet-400/10
              text-3xl
              text-violet-300
              shadow-[0_0_35px_rgba(167,139,250,0.25)]
              transition-all
              duration-500
              hover:scale-110
              hover:bg-violet-400/20
            "
          >
            ♡
          </div>


          {/* Main heading */}

          <h2
            className="
              mt-8
              font-serif
              text-4xl
              leading-tight
              text-white
              sm:text-5xl
              md:text-7xl
            "
          >
            Some memories
            <br />

            <span className="text-violet-300">
              stay forever.
            </span>
          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-7
              max-w-xl
              text-base
              leading-8
              text-white/70
              md:text-lg
            "
          >
            Time changes, people grow, life moves forward —
            but some friendships leave a little piece of
            themselves with us.
          </p>


          {/* Decorative divider */}

          <div
            className="
              mt-9
              flex
              items-center
              justify-center
              gap-4
            "
          >

            <span className="h-px w-16 bg-white/20" />

            <span className="text-xl text-violet-300">
              ✦
            </span>

            <span className="h-px w-16 bg-white/20" />

          </div>


          {/* =========================================
              UKT
          ========================================= */}

          <div
            className="
              mt-9
              font-serif
              text-4xl
              tracking-wide
              md:text-5xl
            "
          >
            UKT

            <span className="ml-2 text-violet-300">
              ♡
            </span>
          </div>


          {/* Final message */}

          <p
            className="
              mt-5
              text-sm
              italic
              text-white/45
            "
          >
            More memories coming soon...
          </p>

        </div>


        {/* =========================================
            BOTTOM MESSAGE
        ========================================= */}

        <p
          className="
            mt-8
            text-xs
            uppercase
            tracking-[0.25em]
            text-white/40
          "
        >
          Made with memories & a little love
        </p>

      </div>


      {/* =========================================
          BOTTOM SCROLL / HEART
      ========================================= */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
          text-violet-300/50
        "
      >
        <span className="text-lg">
          ♡
        </span>
      </div>

    </section>
  );
};

export default FinalSection;