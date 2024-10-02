
export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8">Explore Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-center">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-purple-800">MERN Stack</h2>
          <p className="text-gray-600 mt-2">Master MongoDB, Express.js, React, and Node.js</p>
          <a href="https://mern-stack-course.com" className="mt-4 inline-block text-blue-500 font-bold">
            Get Experience
          </a>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-purple-800">MEAN Stack</h2>
          <p className="text-gray-600 mt-2">Dive into MongoDB, Express.js, Angular, and Node.js</p>
          <a href="https://mean-stack-course.com" className="mt-4 inline-block text-blue-500 font-bold">
            Get Experience
          </a>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-purple-800">Python</h2>
          <p className="text-gray-600 mt-2">Learn Python programming from basics to advanced</p>
          <a href="https://python-course.com" className="mt-4 inline-block text-blue-500 font-bold">
            Get Experience
          </a>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-purple-800">Java</h2>
          <p className="text-gray-600 mt-2">Enhance your skills in Java development</p>
          <a href="https://java-course.com" className="mt-4 inline-block text-blue-500 font-bold">
            Get Experience
          </a>
        </div>
      </div>
    </div>
  );
}

