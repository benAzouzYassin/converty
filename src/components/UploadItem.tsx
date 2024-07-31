import { Download, FileSymlink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "sonner";
import { downloadFromUrl, getBaseFileName } from "@/lib/utils";

type Props = {
  file: File;
  delete: () => void;
  downloadUrl: string | null;
  convertImage: (img: File) => Promise<any>;
};

export default function UploadItem(props: Props) {
  const [tempUrl, setTempUrl] = useState("");
  const [converted, setConverted] = useState(!!props.downloadUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(props.downloadUrl);

  useEffect(() => {
    if (tempUrl) {
      URL.revokeObjectURL(tempUrl);
    }
    setTempUrl(URL.createObjectURL(props.file));
  }, [props]);

  const handleConvert = async () => {
    setIsLoading(true);
    const url = await props.convertImage(props.file);

    if (!url) return toast.error("Error converting " + props.file.name);

    setConverted(true);
    setIsLoading(false);
    toast.success("One image converted successfully.");
    setDownloadUrl(url);
  };

  const handleDownload = () => {
    if (downloadUrl || props.downloadUrl) {
      const fileName = getBaseFileName(props.file.name);
      const url = downloadUrl || props.downloadUrl || "";
      downloadFromUrl(url, fileName);
    } else {
      return toast.error("Can't download the image.");
    }
  };

  return (
    <div className=" text-white relative w-[1150px] bg-[#1f1f1f] flex items-center h-[80px] px-[20px] border border-white/10 rounded-[4px] ">
      <img
        alt=""
        src={tempUrl}
        className="w-[60px] object-contain object-center rounded-md   h-[60px]"
      />
      <span className="text-white  opacity-90 text-[18px] font-mono ml-4">
        {props.file.name}
      </span>
      {converted || props.downloadUrl ? (
        <button
          onClick={handleDownload}
          className=" ml-auto flex gap-2 items-center hover:bg-white hover:scale-105 active:scale-100 transition-all bg-neutral-300  px-4 py-2 text-black  rounded-[4px] font-semibold mr-4"
        >
          Download
          <Download className="-mt-[2px]" />
        </button>
      ) : (
        <button
          onClick={handleConvert}
          className=" ml-auto flex gap-2 items-center  hover:bg-white hover:scale-105 active:scale-100 transition-all bg-neutral-300  px-4 py-2 text-black  rounded-[4px] font-semibold mr-4"
        >
          {isLoading && (
            <LoadingSpinner className="text-black w-[100px] fill-neutral-200" />
          )}
          {!isLoading && (
            <>
              Convert
              <FileSymlink className="-mt-[2px]" />
            </>
          )}
        </button>
      )}
      <button
        onClick={() => {
          props.delete();
          URL.revokeObjectURL(tempUrl);
        }}
        className="  flex gap-2 items-center active:bg-red-500 active:scale-95  hover:bg-red-600 transition-all   px-3 py-2 text-white  rounded-[4px] font-semibold "
      >
        <Trash2 className="-mt-[2px] " />
      </button>
    </div>
  );
}
