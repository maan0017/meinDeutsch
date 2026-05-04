export default function LoadingScreensDemo() {
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-[#121212]">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Loading Screens Demo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Style {num}
            </h2>
            <div className="w-full h-[550px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800 relative bg-white dark:bg-black">
              <iframe
                src={`/test/loading-screen/${num}`}
                className="w-full h-full border-0 absolute inset-0"
                title={`Loading Screen ${num}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
