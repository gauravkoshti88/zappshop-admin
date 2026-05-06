import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-linear-to-l from-[#141414] via-[#1d444d] to-[#0e151b] px-6">
      <div className="w-[45%] flex flex-col items-center justify-center border border-[white] py-10 px-5 rounded-2xl bg-green-100">
        <h1 className="text-7xl font-extrabold text-[red]">404</h1>
      <p className="mt-4 text-2xl font-semibold text-[red]">
        Page Not Found
      </p>
      <p className="mt-2 text-[red] text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
      </div>
    </div>
  );
}
