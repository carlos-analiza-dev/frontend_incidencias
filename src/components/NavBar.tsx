"use client";
import { useAuthStore } from "@/stores/auth/auth-store";
import { LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const NavBar = () => {
  const { isAuthenticated, user } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const path = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link
            href="/incidencias-analiza"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/logo-analiza.png"
              width={300}
              height={300}
              className="h-8 md:h-16 w-auto"
              alt="Cleaning Web Logo"
            />
            <span className="self-center text-base md:text-lg lg:text-2xl font-bold whitespace-nowrap dark:text-white text-gray-800">
              Incidencias <span className="text-blue-600">Analiza</span>
            </span>
          </Link>

          <div className="flex items-center md:order-2 space-x-4 rtl:space-x-reverse md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isAuthenticated && user && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.name}
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer">
                  <Image
                    src="/images/profile.png"
                    width={200}
                    height={200}
                    alt="logo-user"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div
                  onClick={handleLogout}
                  className="flex justify-between items-center p-2 cursor-pointer hover:bg-sky-100 rounded-sm"
                >
                  <p>Cerrar Sesion</p>
                  <LogOut />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {!user && (
          <div className="hidden md:flex items-center md:order-2 space-x-4 rtl:space-x-reverse">
            <div className="flex gap-4">
              <Link
                className={`block py-2 px-3 rounded-md md:p-0 ${
                  path === "/login"
                    ? "text-blue-600 dark:text-blue-500 font-semibold"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                } transition-colors duration-200 hover:underline`}
                href="/login"
              >
                Iniciar Sesion
              </Link>{" "}
              |{" "}
              <Link
                className={`block py-2 px-3 rounded-md md:p-0 ${
                  path === "/register"
                    ? "text-blue-600 dark:text-blue-500 font-semibold"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                } transition-colors duration-200 hover:underline`}
                href="/register"
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}

        {!user && (
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/incidencias-analiza"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-md md:p-0 ${
                    path === "/incidencias-analiza"
                      ? "text-blue-600 dark:text-blue-500 font-semibold"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                  } transition-colors duration-200`}
                >
                  Incidencias
                </Link>
              </li>

              <li>
                <Link
                  href="/accidentes-analiza"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-md md:p-0 ${
                    path === "/accidentes-analiza"
                      ? "text-blue-600 dark:text-blue-500 font-semibold"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                  } transition-colors duration-200`}
                >
                  Accidentes
                </Link>
              </li>
              <hr />
              <li className="md:hidden">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-md md:p-0 ${
                    path === "/accidentes-analiza"
                      ? "text-blue-600 dark:text-blue-500 font-semibold"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                  } transition-colors duration-200`}
                >
                  Iniciar Sesion
                </Link>
              </li>
              <li className="md:hidden">
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-md md:p-0 ${
                    path === "/accidentes-analiza"
                      ? "text-blue-600 dark:text-blue-500 font-semibold"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                  } transition-colors duration-200`}
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
