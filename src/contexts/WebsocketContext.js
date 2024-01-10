import { createContext } from "react";
import {io} from 'socket.io-client'

export const socket = io('http://103.74.103.129:8080');
export const WebsocketContext = createContext(socket);
export const WebsocketProvider = WebsocketContext.Provider;
