import * as React from "react";
import { AuthProvider } from "./Context/AuthContext";
import { ChatProvider } from "./Context/ChatContext";
import { SocketProvider } from "./Context/SocketContext";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <SocketProvider>{children}</SocketProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
export default AppProviders;
