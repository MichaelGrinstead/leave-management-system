export default function Navbar() {
  return (
    <nav className="sticky top-0 z-60 bg-darkBlueGrey transition-colors duration-500 ease-in-out">
      <div className="relative  flex  items-center justify-between px-4 py-4 h-12">
        <h3 className="text-white text-2xl">Leave Management System</h3>
        <h3 className="text-white">Log out</h3>
      </div>
    </nav>
  );
}
