import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true,
});
export default function Chat() {
  const sendMessage = () => {
    socket.emit();
  };
  return (
    <div className="chat-container">
      <input type="text" placeholder="enter your message" />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}
