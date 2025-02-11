import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => {
      console.log(token);
    });
  }, []);

  return (
    <div className="w-full h-16 md:h-20 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo2.png" alt="logo" className="w-20 h-20" />
        <span>mernlog</span>
      </Link>
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <RxCross2 className="text-black" size={32} />
          ) : (
            <IoMenu className="text-black" size={32} />
          )}
        </div>
        <div
          className={`fixed top-16 left-0 w-full h-screen flex flex-col justify-center items-center gap-4 font-medium text-lg bg-[#e6e6ff] text-black transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/post">Trending</Link>
          <Link to="/post">Most Popular</Link>
          <Link to="/">About</Link>
          <SignedOut>
            <Link to="/login">
              <button className="bg-[#c90741] text-white px-4 py-2 rounded-md">
                Login
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/post">Trending</Link>
        <Link to="/post">Most Popular</Link>
        <Link to="/">About</Link>

        <SignedOut>
          <Link to="/login">
            <button className="bg-[#c90741] text-white px-4 py-2 rounded-md">
              Login
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
