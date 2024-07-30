"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import Nav from "@/components/Nav";
import UploadItem from "@/components/UploadItem";
import { downloadFromUrl, getBaseFileName } from "@/lib/utils";
import convertImage from "@/utils/convert";
import loadFfmpeg from "@/utils/load-ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Download, ImageUpIcon, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";

export default function App() {
  const [images, setImages] = useState<File[]>([]);
  const [convertedUrls, setConvertedUrls] = useState<(string | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const ffmpegRef = useRef<any>(null);

  const load = async () => {
    const ffmpegResponse: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpegResponse;
    toast.success("ffmpeg is ready ! ");
    setIsReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages([...Array.from(files)]);
    }
  };

  const deleteImage = (id: string) => {
    setImages((prev) =>
      prev.filter((img) => id !== img.name + img.size + img.lastModified)
    );
  };

  const convertAll = async () => {
    setIsLoading(true);
    const promiseArray = images.map((img) =>
      convertImage(ffmpegRef.current, img)
    );
    const convertedUrls = await Promise.all(promiseArray);
    console.log(convertedUrls);
    setConvertedUrls(convertedUrls);
    convertedUrls.forEach((url, i) => {
      const fileName = getBaseFileName(images[i].name);
      url && downloadFromUrl(url, fileName);
    });
    setIsLoading(false);
  };

  const deleteAll = () => {
    convertedUrls.forEach((url) => url && URL.revokeObjectURL(url));
    setImages([]);
  };
  return (
    <main className="moving-grid-background bg-[#0A0A0B]  min-h-[150vh]">
      <Nav />
      <section className="h-[550px] flex-col hover:cursor-pointer transition-all relative group w-[1150px] rounded-[12px] shadow-white/5 bg-neutral-950 items-center justify-center shadow-md  flex mx-auto mt-[50px] hover:bg-[#121212] border-2 border-white/10 ">
        <ImageUpIcon className="stroke-neutral-700 group-active:scale-105 group-hover:scale-110 transition-transform w-[280px] h-[280px] mx-auto -mt-[50px] " />
        <p className="w-full text-white text-[32px] mt-4 font-normal opacity-40  text-center ">
          Click Here to upload your images
        </p>
        <input
          onChange={handleChange}
          // className="opacity-0 "
          className="border-red-500 border w-full h-full absolute top-0 left-0 opacity-0"
          multiple
          type="file"
          accept="image/*"
        />
      </section>
      <section className=" gap-4 flex-col w-[1150px]   items-center justify-center shadow-md  flex mx-auto ">
        {images.length > 0 && (
          <div className=" gap-4 flex flex-row mt-[20px] w-full">
            <button
              onClick={deleteAll}
              className="  flex gap-2 ml-auto items-center bg-red-700 active:bg-red-500  hover:bg-red-600 hover:scale-105 active:scale-100 transition-all   px-3 py-2 text-white  rounded-[4px] font-semibold "
            >
              <Trash2 className="-mt-[2px] " />
            </button>
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
            key={file.name + file.size + file.lastModified}
            file={file}
          />
        ))}
      </section>
      <Toaster richColors theme="dark" />
    </main>
  );
}

// TODO make the loading when ffmpeg is downloading
// TODO make an about page
// TODO make the website responsive
// TODO make a stop download functionality
// TODO make the input only add elements and the delete from the input
// TODO try to go to vite again
