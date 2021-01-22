import * as React from "react";
import { AuthProvider } from "./AuthContext";
import { ChatProvider } from "./ChatContext";
import { SocketProvider } from "./SocketContext";

function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <SocketProvider>{children}</SocketProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
export default ContextProviders;
