import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import type { Message } from "../../../shared/types";
import { useUser } from '../context/UserContext';

import './Chat.css';

export default function Chat()
{
    const[messages, setMessages] = useState<Message[]>([]);
    const[inputText, setInputText] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    const { user } = useUser(); 

    useEffect(() => {
        socket.on("message", (msg: Message) => {
            setMessages((oldMessages) => [
                ...oldMessages,
                msg
            ])
        })

        return () => {
            socket.off("message");
        };
        
    }, [])

    useEffect(() => {
        console.log("CHAT MONTADO");

        return () => {
            console.log("CHAT DESMONTADO");
        };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView()
    }, [messages])

    function sendMessage(e: React.FormEvent)
    {
        e.preventDefault();

        socket.emit("message", {
            user: user.username,
            text: inputText,
            image: user.avatar
        } satisfies Message);

        setInputText("");
    }

    return(
        <div className='chat-container'>
            <div className='chat'>
                {
                    messages.map((msg, index) => (
                        <div className='message' key={index}>
                            <img src={msg.image}></img>
                            <div className='messageText'>
                                <strong>{msg.user}</strong>
                                <p>{msg.text}</p>                                
                            </div>
                        </div>    
                    ))
                }
                <div ref={bottomRef}></div>                
            </div>
            <form className='chatForm' onSubmit={sendMessage}>
                <input 
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />
                <button>Enviar</button>
            </form>
        </div>        
    )

}