import React, { useEffect, useRef, useState } from "react";
import {
  changeCam,
  getConnectedDevices,
  changePreviewCam,
} from "../../utils/changeCamUtils";
import openMediaStream from "../../utils/openMediaStream";

export default function ChangeLocalMediaStream({
  peerConnection,
  localVideo,
  ChangeCamOverly,
  setChangeCamOverly,
  selectedDeviceId,
  setSelectedDeviceId,
  setStream,
}) {
  const [devices, setDevices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const videoPreview = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (ChangeCamOverly) {
      let streamInstance = null;
      const setupDevicesAndStream = async () => {
        const deviceInstance = await getConnectedDevices();
        setDevices(deviceInstance);

        streamInstance = await openMediaStream();
        if (videoPreview.current)
          videoPreview.current.srcObject = streamInstance;
        setStream(streamInstance);
      };

      try {
        setupDevicesAndStream();
      } catch (error) {
        console.log("error setting upp devices and stream", error);
      }

      return () => {
        if (streamInstance.getVideoTracks()[0]) {
          streamInstance.getVideoTracks()[0].stop();
        }
      };
    }
  }, [ChangeCamOverly]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!ChangeCamOverly) return null;

  return (
    <div
      id="changeCamOverlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        id="changeCamContainer"
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6"
      >
        <div className="relative aspect-video bg-gray-200 rounded-md overflow-hidden">
          <video
            id="videoPreview"
            ref={videoPreview}
            autoPlay
            playsInline
            controls={false}
            muted
            className="w-full h-full object-cover"
          ></video>
        </div>

        <div id="dropdown" ref={dropdownRef} className="relative">
          <button
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Select Camera
          </button>
          {dropdownOpen && (
            <div
              id="dropdown-content"
              className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
            >
              {devices.map((device, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  onClick={() => {
                    changePreviewCam(device.deviceId, videoPreview, setStream);
                    setSelectedDeviceId(device.deviceId);
                    setDropdownOpen(false);
                  }}
                >
                  {device.label || `Camera ${index + 1}`}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Apply Changes Button */}
        <button
          id="changeCamBtn"
          className="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600"
          onClick={() =>
            changeCam(
              setChangeCamOverly,
              selectedDeviceId,
              localVideo,
              setStream,
              peerConnection
            )
          }
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}
