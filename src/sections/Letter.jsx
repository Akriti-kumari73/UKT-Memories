const Letter = () => {
  return (
    <section
      id="letter"
      className="
        relative
        overflow-hidden
        px-6
        py-28
        md:py-40
      "
    >

      {/* ================= BACKGROUND ================= */}

      <img
        src="/photos/bg-2.png"
        alt="Letter background"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* Dark overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/30
        "
      />

      {/* Purple soft overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-violet-950/30
          via-transparent
          to-black/40
        "
      />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Heading */}

        <div className="mb-14 text-center">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-violet-300
            "
          >
            A little letter
          </p>

          <h2
            className="
              mt-5
              font-serif
              text-5xl
              text-white
              md:text-7xl
            "
          >
            Dear UKT,
          </h2>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">

            <span className="h-px w-12 bg-violet-300/60" />

            <span className="text-xl text-violet-300">
              ♡
            </span>

            <span className="h-px w-12 bg-violet-300/60" />

          </div>

        </div>


        {/* ================= LETTER CARD ================= */}

        <div
          className="
            relative
            rounded-3xl
            border
            border-white/20
            bg-[#eee9df]
            p-8
            text-[#24222a]
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
            md:p-16
          "
        >

          {/* Tape */}

          <div
            className="
              absolute
              -top-4
              left-1/2
              h-8
              w-28
              -translate-x-1/2
              rotate-[-3deg]
              bg-violet-200/70
              shadow-sm
            "
          />


          {/* Small decoration */}

          <div
            className="
              absolute
              right-7
              top-7
              text-3xl
              text-violet-400/60
            "
          >
            ♡
          </div>


          {/* Letter */}

          <div
            className="
              font-serif
              text-lg
              leading-9
              md:text-xl
            "
          >

            <p>
              Pata nahi dosti ko words mein perfectly explain karna
              possible hai ya nahi, but kuch log aise hote hain jo life
              mein aakar ordinary moments ko bhi special bana dete hain.
            </p>


            <p className="mt-6">
              Tumhare saath bitaye hue moments shayad dusron ke liye normal
              hon, but mere liye unmein ek alag hi feeling hai — random
              baatein, hasi-mazaak, chhoti-chhoti memories aur woh moments
              jo bina plan kiye yaadgaar ban gaye.
            </p>


            <p className="mt-6">
              Thank you for being one of those people.
            </p>


            <p className="mt-6">
              I hope life tumhe bahut saari happiness de, tumhare saare
              dreams poore ho, aur chahe time kitna bhi change ho, hamari
              ye chhoti si friendship aur ye memories hamesha special
              rahein.
            </p>


            <p className="mt-6">
              Photos toh bahut hain, par memories unse bhi zyada hain. ❤️
            </p>


            <p className="mt-8">
              Stay the same.
              <br />
              Keep smiling.
              <br />
              And keep making memories.
            </p>


            {/* Signature */}

            <p className="mt-10 text-right">

              Always cheering for you,

              <br />

              <span className="text-violet-600">
                Your friend ♡
              </span>

            </p>

          </div>


          {/* Bottom decoration */}

          <div
            className="
              mt-10
              text-center
              text-2xl
              text-violet-400/70
            "
          >
            ✦ ♡ ✦
          </div>

        </div>


        {/* Bottom caption */}

        <p
          className="
            mt-8
            text-center
            text-xs
            uppercase
            tracking-[0.25em]
            text-white/50
          "
        >
          Written with a little love for UKT ♡
        </p>

      </div>

    </section>
  );
};

export default Letter;