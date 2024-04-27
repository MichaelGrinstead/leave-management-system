export default function LeaveRequestListHeader() {
  return (
    <div className="sticky top-56 flex flex-row bg-white text-center font-semibold shadow-custom border w-3/4 justify-between px-10 py-2">
      <h3 className="min-w-8">Id</h3>
      <h3 className="min-w-32">Employee Name</h3>
      <h3 className="min-w-32">Leave Type</h3>
      <h3 className="min-w-32">Start Date</h3>
      <h3 className="min-w-32">Return Date</h3>
      <h3 className="min-w-32">Status</h3>
      <div className="min-w-32">Actions</div>
    </div>
  );
}
