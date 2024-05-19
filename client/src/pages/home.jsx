

const Home= () => {
  const email = localStorage.getItem('email');

  return (
    <div>
      <h1>Welcome, {email}</h1>
      {/* Other content */}
    </div>
  );
};

export default Home;
