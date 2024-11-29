
import KoboPaddyIcon from "../../assets/icons/KoboPaddy.icon";
import LoadingSpinner from "./Spiner";

export default function LoadingPage() {
  return (
    <section className="grid place-content-center h-screen">
      <div className="grid place-items-center">
        <KoboPaddyIcon className="w-20 h-20" />
        <div className="flex gap-2 font-bold text-3xl">
          Loading
          <LoadingSpinner />
        </div>
      </div>
    </section>
  );
}
