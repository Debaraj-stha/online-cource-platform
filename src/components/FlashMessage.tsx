import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Message } from "../store/reducers/messageReducer";
import type { AppDispatch, RootState } from "../store/store";


const FlashMessage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.message);


  if (messages.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 space-y-2 z-50">
      {messages.map((msg:Message) => (
        <div
          key={msg.id}
          className={`p-3 rounded shadow text-white z-50 ${
            msg.type === "success"
              ? "bg-green-500"
              : msg.type === "error"
              ? "bg-red-500"
              : msg.type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        >
          {[msg.messages].map((text, i) => (
            <div key={i}>{text}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FlashMessage;
