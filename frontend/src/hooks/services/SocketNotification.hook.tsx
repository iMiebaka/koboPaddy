import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import NotificationModal from "../../components/layout/NotificationModal";

export default function SocketNotificationHook() {
  const [payload, setPayload] = useState<ITSocketOption | undefined>(undefined);
  const audio = new Audio('/notification-2-269292.mp3');

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      console.error("No access token found.");
      return;
    }

    const socket = new WebSocket(
      `${import.meta.env.VITE_APP_API_DOMAIN}/notifications/?token=${token}`
    );

    // WebSocket event listeners
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Message received from server:", data);
      setPayload(data);
      audio.play();

      setTimeout(() => {
        setPayload(undefined);
        document.getElementById("notification-overlay")?.classList.remove("hidden")
      }, 4000)
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts


  return (
    <div>
      {/* <audio id="audio-element" src="/notification-2-269292.mp3"></audio> */}
      {payload && (
        <NotificationModal
          message={payload.message}
          status={payload.status}
        />
      )}
    </div>
  );
}
