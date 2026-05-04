import WordExplainComp from "@/components/WordExplainComp";

export default function DisplayWordMeaningPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-20 px-4 bg-slate-50 dark:bg-[#121212] gap-32 overflow-x-hidden">
      {/* 1. THEMES SHOWCASE */}
      <section className="flex flex-col items-center gap-12 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b pb-2 w-full text-center">
          1. Color Themes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-24 gap-x-8 w-full mt-8">
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Bernstein"
              meaning="Amber (Default)"
              position="UP"
              theme="amber"
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Smaragd"
              meaning="Emerald"
              position="UP"
              theme="emerald"
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Blau"
              meaning="Blue"
              position="UP"
              theme="blue"
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Grün"
              meaning="Green"
              position="DOWN"
              theme="green"
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Rot"
              meaning="Red"
              position="DOWN"
              theme="red"
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Orange"
              meaning="Orange"
              position="DOWN"
              theme="orange"
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Grau"
              meaning="Slate (Subtext)"
              position="LEFT"
              theme="slate"
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-16">
            <WordExplainComp
              word="Hellgelb"
              meaning="Light Yellow"
              position="RIGHT"
              theme="light-yellow"
              highlight
            />
          </div>
        </div>
      </section>

      {/* 2. SIZES & FONTS SHOWCASE */}
      <section className="flex flex-col items-center gap-12 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b pb-2 w-full text-center">
          2. Custom Sizes (meaningClassName)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-32 gap-x-8 w-full mt-12">
          <div className="flex justify-center items-center py-12">
            <WordExplainComp
              word="Absatz"
              meaning="This is a very long meaning that forces the tooltip to wrap into multiple lines instead of staying on one line."
              position="DOWN"
              theme="emerald"
              meaningClassName="!whitespace-normal w-48 text-center"
            />
          </div>
          <div className="flex justify-center items-center py-12">
            <WordExplainComp
              word="Riesig"
              meaning="Huge Text [20px] w/ padding"
              position="UP"
              theme="blue"
              meaningClassName="text-[20px] p-4 rounded-xl shadow-lg"
            />
          </div>
          <div className="flex justify-center items-center py-12">
            <WordExplainComp
              word="Mikro"
              meaning="Tiny Text [8px]"
              position="LEFT"
              theme="slate"
              meaningClassName="text-[8px] py-0 px-1"
            />
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC OFFSETS SHOWCASE */}
      <section className="flex flex-col items-center gap-12 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b pb-2 w-full text-center">
          3. Dynamic Offsets (offsetX / offsetY)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-32 gap-x-12 w-full mt-12 md:pl-12">
          <div className="flex justify-center items-center h-24">
            <WordExplainComp
              word="Weit (X)"
              meaning="offsetX = 60"
              position="LEFT"
              theme="red"
              offsetX={60}
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-24">
            <WordExplainComp
              word="Nah (Y)"
              meaning="offsetY = -10"
              position="UP"
              theme="orange"
              offsetY={-10}
              highlight
            />
          </div>
          <div className="flex justify-center items-center h-24">
            <WordExplainComp
              word="Diagonal Weit"
              meaning="X=40, Y=30"
              position="TOP_RIGHT_RIGHT"
              theme="green"
              offsetX={40}
              offsetY={30}
              highlight
            />
          </div>
        </div>
      </section>

      {/* 4. THE 12 POSITIONS GRID */}
      <section className="flex flex-col items-center gap-12 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b pb-2 w-full text-center">
          4. The 12 Anchor Positions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-32 gap-x-12 w-full mt-16 pb-32">
          <div className="flex justify-center items-center">
            <WordExplainComp word="Vater" meaning="LEFT" position="LEFT" />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp word="Tochter" meaning="DOWN" position="DOWN" />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp word="Mutter" meaning="RIGHT" position="RIGHT" />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp word="Sohn" meaning="UP" position="UP" />
          </div>

          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Katze"
              meaning="TOP_LEFT_TOP"
              position="TOP_LEFT_TOP"
              theme="emerald"
              highlight
            />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Hund"
              meaning="TOP_LEFT_LEFT"
              position="TOP_LEFT_LEFT"
              theme="emerald"
              highlight
            />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Vogel"
              meaning="TOP_RIGHT_TOP"
              position="TOP_RIGHT_TOP"
              theme="emerald"
              highlight
            />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Fisch"
              meaning="TOP_RIGHT_RIGHT"
              position="TOP_RIGHT_RIGHT"
              theme="emerald"
              highlight
            />
          </div>

          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Apfel"
              meaning="BOTTOM_LEFT_BOTTOM"
              position="BOTTOM_LEFT_BOTTOM"
              theme="blue"
              highlight
            />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Brot"
              meaning="BOTTOM_LEFT_LEFT"
              position="BOTTOM_LEFT_LEFT"
              theme="blue"
              highlight
            />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Milch"
              meaning="BOTTOM_RIGHT_BOTTOM"
              position="BOTTOM_RIGHT_BOTTOM"
              theme="blue"
              highlight
            />
          </div>
          <div className="flex justify-center items-center">
            <WordExplainComp
              word="Wasser"
              meaning="BOTTOM_RIGHT_RIGHT"
              position="BOTTOM_RIGHT_RIGHT"
              theme="blue"
              highlight
            />
          </div>
        </div>
      </section>
    </div>
  );
}
