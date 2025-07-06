import { useEffect, useState } from "react";
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
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState("");
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessages(data.message);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };
  return (
    <div className="chat-container">
      <input
        type="text"
        placeholder="enter your message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <div className="received-messages">
        {receivedMessages && (
          <div className="message">
            <span className="message-text">{receivedMessages}</span>
          </div>
        )}
      </div>
    </div>
  );
}
