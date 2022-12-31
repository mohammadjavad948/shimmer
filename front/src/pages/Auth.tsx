export function Auth() {
  return (
    <div className="isolate bg-white flex h-[100vh] w-100 justify-center items-center overflow-hidden">
      <div className="absolute -z-10 transform-gpu overflow-hidden blur-3xl">
        <svg
          className="relative -z-10 h-[28rem] max-w-none rotate-[40deg] sm:left-1 sm:h-[40rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fill-opacity=".3"
            d="m 355.12001,288.32015 55.2746,398.30385 c 0,0 315.67919,221.10738 461.17221,144.44282 145.49298,-76.66456 -297.8617,-300.87766 -297.8617,-300.87766 0,0 139.34441,-218.22606 345.23737,-94.19481 205.89291,124.03125 302.34971,480.55153 233.95211,509.94814 -162.04487,119.68681 146.2797,208.28951 487.2477,-5.67288 230.7086,-184.30909 -289.0728,-701.28811 -287.5841,-699.92652 0,0 -539.61405,-337.841095 -997.43819,47.97706 z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9089FC"></stop>
              <stop offset="1" stop-color="#FF80B5"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="p-4 rounded-lg fixed right-[20%] border-2 border-fuchsia-400 bg-white max-w-[30%] w-[30%] text-center">
        <h3 className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Welcome
        </h3>

        <input
          type="text"
          placeholder="username"
          className="mt-5 rounded-lg w-[90%] border-fuchsia-300 hover:border-fuchsia-500 focus:ring-fuchsia-700 focus:ring-1 border-2"
        />

        <input
          type="password"
          placeholder="password"
          className="mt-2 rounded-lg w-[90%] border-fuchsia-300 hover:border-fuchsia-500 focus:ring-fuchsia-700 focus:ring-1 border-2"
        />
      </div>
    </div>
  );
}
