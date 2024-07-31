export default function Loading() {
  return (
    <main className=" bg-[#0A0A0B]  h-screen">
      <div className=" flex items-center flex-col relative justify-center gap-7 h-[80vh]">
        <p className="text-[#CECECE] text-6xl font-sans">Almost there....</p>
        <div className="w-[400px] relative">
          <div className="h-2 bg-[#CECECE] w-[300px] !origin-right loading-bar-animation rounded"></div>
        </div>
      </div>
    </main>
  );
}
