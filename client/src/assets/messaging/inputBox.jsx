import { useState } from "react";

export default function InputBox({
  socket,
  setMessage,
  strangerUserId,
  username,
  setUpdateUser,
}) {
  const [messageInputValue, setMessageInputValue] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("private message", {
      content: {
        username: username,
        message: messageInputValue,
        userid: socket.id,
      },
      to: strangerUserId,
    });

    setMessage((prevMessages) => [
      ...prevMessages,
      {
        username: username,
        message: messageInputValue,
      },
    ]);
    setMessageInputValue("");
  }

  function getNewUser(e) {
    e.preventDefault();
    setUpdateUser((prev) => prev + 1);
  }

  return (
    <div
      id="sendMessageContainer"
      className="flex items-center flex-1 gap-2 p-4 bg-gray-100 border-t border-gray-300"
    >
      <button
        id="changeNewUser"
        onClick={getNewUser}
        className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        New
      </button>

      <form
        onSubmit={sendMessage}
        id="sendMassage"
        className="flex flex-1 items-center gap-2"
      >
        <input
          type="text"
          name="sendMessage"
          id="sendMessageBox"
          value={messageInputValue}
          onChange={(e) => setMessageInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          id="sendMessageBtn"
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
