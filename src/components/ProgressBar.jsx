function ProgressBar() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500">
        1:24
      </span>

      <div className="h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[35%] rounded-full bg-white" />
      </div>

      <span className="text-xs text-gray-500">
        3:42
      </span>
    </div>
  );
}

export default ProgressBar;