import React, { useEffect, useState } from "react";

import ioClient from "socket.io-client";

export function Chat() {
  const [msg, setMsg] = useState<string[]>([]);

  useEffect(() => {
    const socket = ioClient();
    socket.on("msg", setMsg);
  }, []);

  return <div>{msg}</div>;
}
