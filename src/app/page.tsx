"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import Nav from "@/components/Nav";
import UploadItem from "@/components/UploadItem";
import { cn, downloadFromUrl, getBaseFileName } from "@/lib/utils";
import convertImage from "@/utils/convert";
import loadFfmpeg from "@/utils/load-ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Download, ImageUpIcon, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import Loading from "./loading";
import { isValidType } from "@/utils/fileType";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Footer from "@/components/Footer";

export default function App() {
  const [images, setImages] = useState<File[]>([]);
  const [convertedUrls, setConvertedUrls] = useState<(string | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const ffmpegRef = useRef<any>(null);

  //FFMPEG stuff
  const load = async () => {
    const ffmpegResponse: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpegResponse;
    setIsReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const filteredFiles = files.filter((f) => {
      const isValid = isValidType(f.type);
      if (!isValid) toast.error("You uploaded a non image file.");
      return isValid;
    });
    setImages([...filteredFiles, ...images]);
  };

  const deleteImage = (id: string) => {
    if (!isLoading) {
      setImages((prev) =>
        prev.filter((img) => id !== img.name + img.size + img.lastModified)
      );
    }
  };

  const convertAll = async () => {
    setIsLoading(true);
    const promiseArray = images.map((img) =>
      convertImage(ffmpegRef.current, img)
    );
    const convertedUrls = await Promise.all(promiseArray);
    setConvertedUrls(convertedUrls);
    convertedUrls.forEach((url, i) => {
      const fileName = getBaseFileName(images[i].name);
      url && downloadFromUrl(url, fileName);
    });
    toast.success("Images converted successfully.");
    setIsLoading(false);
  };

  const deleteAll = () => {
    convertedUrls.forEach((url) => url && URL.revokeObjectURL(url));
    setImages([]);
    setIsLoading(false);
  };

  if (!isReady) return <Loading />;
  return <Loading />;
  return (
    <main className="moving-grid-background overflow-x-hidden bg-[#0A0A0B] flex flex-col  min-h-[110vh]">
      <Nav />
      <section className=" pb-10 px-4 h-[300px] md:h-[550px] flex-col hover:cursor-pointer transition-all relative group sm:w-[90%] lg:w-[50%] xl:w-[1150px] rounded-[12px] shadow-white/5 bg-neutral-950 items-center justify-center shadow-md  flex mx-auto mt-[50px] hover:bg-[#121212] border-2 border-white/10 ">
        <ImageUpIcon className="stroke-neutral-700 group-active:scale-95  transition-transform w-[120px] h-[120px] md:w-[280px] md:h-[280px] mx-auto -mt-[50px] " />
        <p className="w-full text-white text-xl md:text-[32px] md:mt-4  font-normal opacity-40  text-center  translate-y-6 ">
          Click Here to upload your images
        </p>
        <input
          onChange={addFiles}
          // className="opacity-0 "
          className=" hover:cursor-pointer border w-full h-full absolute top-0 left-0 opacity-0"
          multiple
          type="file"
          accept="image/*"
        />
      </section>
      <section className=" pb-32 gap-4 flex-col w-[1150px]   items-center justify-center shadow-md  flex mx-auto ">
        {images.length > 0 && (
          <div className=" gap-4 flex flex-row mt-[20px] w-full">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={deleteAll}
                    className="  flex gap-2 ml-auto items-center bg-red-700 active:bg-red-500  hover:bg-red-600 hover:scale-105 active:scale-100 transition-all   px-3 py-2 text-white  rounded-[4px] font-semibold "
                  >
                    <Trash2 className="-mt-[2px] " />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-white/70 !rounded text-black font-medium">
                  <p className="text-[14px]">Remove all images</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <button
              onClick={convertAll}
              className="  flex gap-2 items-center hover:bg-white hover:scale-105  active:scale-100 transition-all bg-neutral-300  px-4 py-2 text-black  rounded-[4px] font-semibold "
            >
              {isLoading ? (
                <LoadingSpinner className="text-black w-[135px] fill-neutral-200" />
              ) : (
                <>
                  Download All
                  <Download className="-mt-[2px]" />
                </>
              )}
            </button>
          </div>
        )}
        {images.map((file, i) => (
          <UploadItem
            convertImage={(image) => convertImage(ffmpegRef.current, image)}
            downloadUrl={convertedUrls[i]}
            delete={() =>
              deleteImage(file.name + file.size + file.lastModified)
            }
            key={file.name + file.size + file.lastModified + i}
            file={file}
          />
        ))}
      </section>
      <Toaster richColors theme="dark" position="top-left" />
      <Footer />
    </main>
  );
}
