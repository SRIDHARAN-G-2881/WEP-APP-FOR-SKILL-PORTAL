import { useLocation } from "react-router-dom";

export default function Signup() {
  const location = useLocation();
  const name = location.state ? location.state.displayName : '';

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center justify-center">
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Welcome {name ? name : ''},
          </h1>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Enhance Your Skills with Our BIT SKILL Platform
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Join our community and gain access to a wide range of resources and training programs
            designed to help you improve your skills and achieve your goals.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src="https://elearningimages.adobe.com/files/2020/06/AdobeStock_244900189-scaled.jpeg"
            alt="Skill Development"
            className="rounded-lg shadow-lg w-full max-w-41 -mt-8"
          />
        </div>
      </main>
    </div>
  );
}
