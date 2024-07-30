import { MailIcon } from "lucide-react";

export default function Nav() {
  return (
    <nav className="  mono-font  font-light flex items-center px-[90px] min-h-[90px] text-white">
      <span className="flex gap-3 items-center text-[32px] hover-underline-animation hover:cursor-default font-medium">
        Converty
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
      <span className="h-[40px] rounded-[1px] mx-[35px] w-[5px] bg-white/10  "></span>
      <ul className="text-[22px]  flex items-center gap-10">
        <li className="hover:scale-105 active:scale-100 transition-transform hover:cursor-pointer hover:font-bold">
          <a href="#">👋🏻 home </a>
        </li>
        <li className="hover:scale-105 active:scale-100 transition-transform hover:cursor-pointer hover:font-bold">
          <a href="https://yasseen.tech/" target="_blank">
            👀 about
          </a>
        </li>
        {/* <li className="hover:scale-105 active:scale-100 transition-transform hover:cursor-pointer hover:font-bold">
          ☕ support
        </li> */}
      </ul>
    </nav>
  );
}
