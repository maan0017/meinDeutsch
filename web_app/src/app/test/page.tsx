import Link from "next/link";

export default function TestRoutesPage() {
  const routes = [
    {
      path: "/test/audio-test",
      title: "audio-test",
      description: "Standard STT vs German GSTT comparison",
    },
    {
      path: "/test/audio-test-2",
      title: "audio-test-2",
      description: "Continuous Voice Assistant test",
    },
    {
      path: "/test/loading-screen",
      title: "loading-screen",
      description: "Demo of various loading screen designs",
    },
    {
      path: "/test/display-word-meaning",
      title: "display-word-meaning",
      description: "Display word meaning",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-300 font-mono text-[13px]">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 text-xl font-bold">Index of /test</h1>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-800 text-gray-600 dark:text-gray-400">
              <th className="pb-2 font-normal w-1/3">Name</th>
              <th className="pb-2 font-normal">Description</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            <tr>
              <td className="py-1.5">
                <Link
                  href="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ../
                </Link>
              </td>
              <td></td>
            </tr>
            {routes.map((route) => (
              <tr
                key={route.path}
                className="border-b border-transparent hover:bg-gray-50 dark:hover:bg-[#111]"
              >
                <td className="py-1.5">
                  <Link
                    href={route.path}
                    className="text-blue-600 dark:text-blue-400 hover:underline block"
                  >
                    {route.title}
                  </Link>
                </td>
                <td className="py-1.5 text-gray-500 dark:text-gray-500 font-normal">
                  {route.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-800 text-gray-400 dark:text-gray-600 text-[11px]">
          internal test directory
        </div>
      </div>
    </div>
  );
}
