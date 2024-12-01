

export default function SocketNotificationHook() {
  // Create a WebSocket connection
  const socket = new WebSocket(`${import.meta.env.FRONTEND_URL}/notifications`);

  // Event listener for when the connection is opened
  socket.onopen = () => {
    console.log("WebSocket connection established.");

    // Send a message to the server
    socket.send(JSON.stringify({ message: "Hello Server!" }));
  };

  // Event listener for receiving messages from the server
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message received from server:", data);
  };

  // Event listener for errors
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  // Event listener for connection closure
  socket.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };

  return <div></div>;
}
