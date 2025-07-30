import Navbar from "../components/Navbar";

function Dashboard() {
  const username = "user"; // bisa dari context/localStorage

  return (
    <Navbar>
      {/* Salam */}
      <div className="bg-[#F1F7F7] p-6 rounded-xl mb-6 flex justify-center items-center max-w-3xl mx-auto">
        <span className="text-2xl font-semibold text-gray-700">
          Hai, {username}
        </span>
      </div>


      {/* Judul */}
      <h2 className="flex flex-col items-center text-xl font-semibold text-gray-800 mb-4">Popular</h2>

      {/* Daftar Buku */}
      <div className="px-8 grid grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-400 h-40 rounded-lg flex items-end justify-center text-white text-sm p-2"
          >
            {"{judul buku}"}
          </div>
        ))}
      </div>
    </Navbar>
  );
}

export default Dashboard;
