export default function Loading() {
  return (
    <main className=" bg-[#0A0A0B]  h-screen">
      <div className=" flex items-center flex-col relative justify-center gap-7 h-[80vh]">
        <p className="text-[#CECECE] text-5xl font-sans">Almost there....</p>
        <div className="w-[400px] border border-white/20  overflow-hidden relative">
          <progress className="progress h-full w-80"></progress>
        </div>
      </div>
    </main>
  );
}
