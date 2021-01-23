import * as React from "react";
import { ChatProvider } from "./ChatContext";
import { SocketProvider } from "./SocketContext";

function ContextProviders({ children }) {
  return (
    <ChatProvider>
      <SocketProvider>{children}</SocketProvider>
    </ChatProvider>
  );
}
export default ContextProviders;
