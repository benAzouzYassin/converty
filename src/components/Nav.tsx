import { MailIcon } from "lucide-react";

export default function Nav() {
  return (
    <nav className="  mono-font  font-light flex items-center px-5 md:px-[90px] min-h-[90px] text-white">
      <span className="flex flex-col text-[32px]  hover:cursor-default font-medium">
        Converty
        <div className="w-1/2 h-[3px] opacity-70 bg-white "></div>
      </span>
      <div className="flex items-center gap-5 ml-auto">
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
      <span className="h-[40px] rounded-[1px] hidden md:block md:mx-[35px] w-[5px] bg-white/10  "></span>
      <ul className="text-[22px]  hidden md:flex gap-4 items-center md:gap-10">
        <li className=" active:scale-100 group transition-transform hover:cursor-pointer ">
          <a href="#">
            <span className="md:block hidden">👋🏻</span> home{" "}
          </a>
          <div className="group-hover:w-3/4 opacity-70 h-[2px] mt-px rounded bg-white w-0 transition-all"></div>
        </li>
        <li className=" active:scale-100 group transition-transform hover:cursor-pointer ">
          <a href="https://yasseen.tech/" target="_blank">
            <span className="md:block hidden">👀</span> creator
          </a>
          <div className="group-hover:w-3/4 opacity-70 h-[2px] mt-px rounded bg-white w-0 transition-all"></div>
        </li>
        {/* <li className="hover:scale-105 active:scale-100 transition-transform hover:cursor-pointer hover:font-bold">
          ☕ support
        </li> */}
      </ul>
    </nav>
  );
}
