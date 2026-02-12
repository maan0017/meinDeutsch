"use client";

import Vector1 from "./Vector1.svg";

const Roadmap = () => {
  const milestones = [
    {
      id: 1,
      title: "Discovery",
      description: "Initial research & planning",
      link: "/step-1",
    },
    {
      id: 2,
      title: "Design",
      description: "Wireframing & Prototyping",
      link: "/step-2",
    },
    {
      id: 3,
      title: "Development",
      description: "Coding the frontend",
      link: "/step-3",
    },
    {
      id: 4,
      title: "Testing",
      description: "QA and bug fixing",
      link: "/step-4",
    },
    {
      id: 5,
      title: "Launch",
      description: "Deploy to production",
      link: "/step-5",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-12">
        Project Roadmap
      </h1>

      <img src={Vector1} />
      <img src={Vector1} className="w-5 h-5" />

      <div className="relative w-full max-w-4xl">
        {/* SVG Layer - The Curvy Path */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* This path is a visual approximation of a snake layout */}
            {/* M = Move to, C = Cubic Bezier Curve */}
            <path
              d="M 200 50 
                  C 500 50, 500 250, 200 250 
                  C -100 250, -100 450, 200 450
                  C 500 450, 500 650, 200 650
                  C -100 650, -100 850, 200 850"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="4"
              strokeDasharray="10 5"
            />
          </svg>
        </div>

        {/* Mobile Line (Simple Vertical) */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-300 md:hidden"></div>

        {/* Node Layer - The Clickable Items */}
        <div className="relative z-10 space-y-20 md:space-y-0">
          {milestones.map((item, index) => {
            // Determine alignment for desktop snake layout
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`flex items-center md:absolute w-full md:w-auto transform transition-all hover:scale-105
                  ${
                    // Custom positioning logic for the "Snake" shape
                    index === 0
                      ? "md:top-[10px] md:left-[200px]"
                      : index === 1
                        ? "md:top-[210px] md:left-[200px]"
                        : index === 2
                          ? "md:top-[410px] md:left-[200px]"
                          : index === 3
                            ? "md:top-[610px] md:left-[200px]"
                            : "md:top-[810px] md:left-[200px]"
                  }
                `}
                // Note: In a real app, you might calculate 'top' dynamically based on index * 200
              >
                {/* The Clickable Node */}
                <button
                  onClick={() => (window.location.href = item.link)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-lg z-20
                    ${index % 2 === 0 ? "bg-blue-500" : "bg-purple-500"}
                    group-hover:bg-gray-800 transition-colors
                  `}
                  >
                    {item.id}
                  </div>

                  {/* Tooltip / Label */}
                  <div
                    className={`mt-4 bg-white p-4 rounded-xl shadow-md border border-gray-100 w-48 text-center
                    ${isLeft ? "md:ml-0" : "md:mr-0"}
                  `}
                  >
                    <h3 className="font-bold text-gray-700">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
