import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import type { Message } from "../../../shared/types";

import './Chat.css';

export default function Chat()
{
    const[messages, setMessages] = useState<Message[]>([]);
    const[inputText, setInputText] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

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
        bottomRef.current?.scrollIntoView()
    }, [messages])

    function sendMessage(e: React.FormEvent)
    {
        e.preventDefault();

        socket.emit("message", {
            user: username,
            text: inputText,
            image: ""
        } satisfies Message);

        setInputText("");
    }

    return(
        <div className='chat-container'>
            <div className='chat'>
                <h1>crew</h1>
                {
                    messages.map((msg, index) => (
                        <div className='message' key={index}>
                            <img src={avatar}></img>
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