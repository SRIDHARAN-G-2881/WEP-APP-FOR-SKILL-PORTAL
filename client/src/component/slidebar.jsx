
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-900 to-gray-700 text-white fixed shadow-lg">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Navigator</h2>
        <ul>
          <li className="mb-4">
            <Link to="/day-skill" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600 hover:text-gray-200">
              Day Skill
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/night-skill" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600 hover:text-gray-200">
              Night Skill
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/ongoing-skill" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600 hover:text-gray-200">
              Ongoing Skill
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

