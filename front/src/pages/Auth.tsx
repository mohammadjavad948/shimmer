export function Auth() {
  return (
    <div className="isolate bg-gray-50 flex h-[100vh] w-100 justify-center items-center overflow-hidden">
      <div className="p-8 mx-5 rounded-lg border-gray-500 border-2 bg-white max-w-[100%] w-[300px] text-center">
        <h3 className="font-bold text-2xl">
          Welcome
        </h3>

        <input
          type="text"
          placeholder="username"
          className="mt-5 rounded-lg w-[100%] border-gray-400 border-1"
        />

        <input
          type="password"
          placeholder="password"
          className="mt-2 rounded-lg w-[100%] border-gray-400 border-1"
        />

        <button
          className="inline-block mt-4 rounded-lg bg-indigo-600 px-3 py-1 text-base text-white shadow-sm ring-1 ring-indigo-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
