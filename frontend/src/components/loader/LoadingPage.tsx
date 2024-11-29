
import KoboPaddyIcon from "../../assets/icons/KoboPaddy.icon";
import LoadingSpinner from "./Spiner";

export default function LoadingPage() {
  return (
    <section className="grid place-content-center h-screen">
      <div className="grid place-items-center">
        <KoboPaddyIcon />
        <div className="flex gap-2">
          Loading
          <LoadingSpinner />
        </div>
      </div>
    </section>
  );
}
