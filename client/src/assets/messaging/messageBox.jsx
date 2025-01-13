import { useRef, useEffect } from "react";

export default function MessagBox({
  message,
  username,
  socket,
  setMessage,
  strangerUsername,
  strangerUserId,
  connectionStatus,
}) {
  const scrollMessageDiv = useRef(null);

  useEffect(() => {
    scrollMessageDiv.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [message]);

  useEffect(() => {
    if (socket) {
      socket.on("private message", ({ content, from }) => {
        if (strangerUserId === from) {
          setMessage((prevMessages) => [...prevMessages, content]);
        }
      });

      return () => {
        socket.removeAllListeners("private message");
      };
    }
  }, [strangerUserId]);

  return (
    <>
      <div
        id="messageBox"
        className="flex flex-col h-full bg-gray-100 p-4 overflow-y-auto"
      >
        {connectionStatus !== null && message.length === 0 && (
          <div
            id="overlayStatus"
            className="flex items-center justify-center h-full text-center text-gray-600 text-lg font-medium"
          >
            {connectionStatus ? (
              <p>
                {username} is connected with{" "}
                <span className="font-semibold">{strangerUsername}</span>
              </p>
            ) : (
              <p>Looking For Stranger...</p>
            )}
          </div>
        )}

        {message.map((item, index) =>
          item ? (
            <div
              key={index}
              className={`flex ${
                item.username === username ? "justify-end" : "justify-start"
              } my-2`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  item.username === username
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {item.message}
              </div>
            </div>
          ) : null
        )}

        <div ref={scrollMessageDiv}></div>
      </div>
    </>
  );
}
