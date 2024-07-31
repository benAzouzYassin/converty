import { Copyright, MailIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="h-[60px]  flex items-center w-screen px-3  text-white  mt-auto lg:px-20 border-t-2 border-white/20 ">
      <div className="flex opacity-80 font-normal font-mono items-center gap-2 md:gap-3 md:text-[18px]">
        <Copyright />
        Made with ❤ by
        <a href="https://yasseen.tech/" className="border-b  " target="_blank">
          yassine ben azouz
        </a>
      </div>
      <div className="md:flex items-center  hidden gap-5 ml-auto">
        <a
          href="https://github.com/benAzouzYassin"
          target="_blank"
          className="hover:scale-110 active:scale-100 transition-transform"
        >
          <img alt="" className="w-[27px] ml-auto" src="/github.svg" />
        </a>

        {/* <img alt="" className="w-[32px]" src="/kofi.svg" /> */}
        <a
          href="mailto:yassinebenazouz123@gmail.com"
          className="hover:scale-110 active:scale-100 transition-transform"
        >
          <MailIcon className="w-[30px] h-[30px]" />
        </a>
      </div>
    </footer>
  );
}
