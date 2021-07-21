import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const ENDPOINT = 'localhost:5000';

let socket;

const ConnectSocket = () => {

  useEffect(() => {
    const name = "thanhliem"
    const room = "1"
    socket = io(ENDPOINT,['transport','polling']);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

    return <div id="chatroom"></div>
}
export default ConnectSocket;