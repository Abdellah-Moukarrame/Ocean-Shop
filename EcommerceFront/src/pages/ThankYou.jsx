import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-900">Thank You</h1>
      <p className="text-gray-700 mb-8">
        Your Place order is successful. Email ko nlng ung update pre..
      </p>
      <Link to="/" className="bg-black hover:bg-gray-950 text-white py-3 px-8">
        Go back home
      </Link>
    </div>
  );
}
