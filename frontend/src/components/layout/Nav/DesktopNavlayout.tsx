import NavLinks from "./NavLinks";

export default function DesktopNavlayout() {
  return (
    <div
      className={`inset-y-0 h-screen absolute left-0 z-30 lg:w-64 w-0 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center">
          <img className="w-10" src="/vite.svg" alt="site-icon" />

          <span className="mx-2 text-2xl font-semibold text-white">
            KoboPaddy
          </span>
        </div>
      </div>

      <NavLinks />
    </div>
  );
}
