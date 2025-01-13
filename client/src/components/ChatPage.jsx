import { useState, useRef } from "react";
import LocalVideo from "../assets/videoCall/localVideo";
import RemoteVideo from "../assets/videoCall/remoteVideo";
import MessagBox from "../assets/messaging/messageBox";
import InputBox from "../assets/messaging/inputBox";
import useSocket from "../hooks/useSocket";
import usePeerConnection from "../hooks/usePeerConnection";
import ConnectionStatusBar from "../assets/messaging/connectionStatusBar";
import startWebRtcNegotiation from "../utils/startWebRtcNegotiation";
import ChangeLocalMediaStream from "../assets/videoCall/changeCam";

export default function ChatPage({ username, setUsername }) {
  const [message, setMessage] = useState([]);
  const [peerConnection, setPeerConnection] = useState(null);
  const [ChangeCamOverly, setChangeCamOverly] = useState(null);
  const [updateUser, setUpdateUser] = useState(0);
  const [stream, setStream] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [strangerdata, setStrangerData] = useState(null);
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const { socket, strangerUserId, strangerUsername, connectionStatus } =
    useSocket(
      username,
      remoteVideo.current,
      setMessage,
      updateUser,
      peerConnection,
      setPeerConnection,
      setStrangerData
    );

  usePeerConnection(setPeerConnection);
  startWebRtcNegotiation(socket, strangerdata, peerConnection, stream);

  return (
    <div
      id="chatPage"
      className="min-h-screen grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-200"
    >
      <div id="videoCall" className="p-4 bg-white shadow-lg rounded-lg">
        <ChangeLocalMediaStream
          peerConnection={peerConnection}
          localVideo={localVideo.current}
          ChangeCamOverly={ChangeCamOverly}
          setChangeCamOverly={setChangeCamOverly}
          selectedDeviceId={selectedDeviceId}
          setSelectedDeviceId={setSelectedDeviceId}
          setStream={setStream}
        />
        <div className="flex flex-col gap-2 h-full">
          <LocalVideo
            localVideo={localVideo}
            peerConnection={peerConnection}
            setChangeCamOverly={setChangeCamOverly}
            setStream={setStream}
            stream={stream}
            selectedDeviceId={selectedDeviceId}
            socket={socket}
            strangerUserId={strangerUserId}
          />
          <RemoteVideo
            remoteVideo={remoteVideo}
            peerConnection={peerConnection}
            setChangeCamOverly={setChangeCamOverly}
          />
        </div>
      </div>

      <div
        id="messaging"
        className="flex flex-col p-4 bg-white shadow-lg rounded-lg"
      >
        <ConnectionStatusBar strangerUsername={strangerUsername} />
        <MessagBox
          message={message}
          username={username}
          socket={socket}
          setMessage={setMessage}
          strangerUsername={strangerUsername}
          strangerUserId={strangerUserId}
          connectionStatus={connectionStatus}
        />
        <InputBox
          socket={socket}
          setMessage={setMessage}
          setUsername={setUsername}
          setUpdateUser={setUpdateUser}
          strangerUserId={strangerUserId}
          username={username}
          strangerUsername={strangerUsername}
        />
      </div>
    </div>
  );
}
