import React from "react";

type PopupMessageProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const PopupMessage = ({ message, type, onClose }: PopupMessageProps) => {
  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 p-4 w-96 text-center rounded-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white shadow-lg z-50`}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 mt-4 text-gray-800 bg-white rounded hover:bg-gray-300"
      >
        Close
      </button>
    </div>
  );
};

export default PopupMessage;
