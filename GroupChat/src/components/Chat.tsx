import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

interface Message {
  id?: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: any;
}

interface ChatProps {
  currentUser: any;
}

const Chat: React.FC<ChatProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Message)
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email,
      text: newMessage,
      timestamp: serverTimestamp()
    });

    setNewMessage("");
  };

  // Helper to format Firestore timestamp or JS Date
  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    let dateObj;
    if (timestamp.seconds) {
      dateObj = new Date(timestamp.seconds * 1000);
    } else {
      dateObj = new Date(timestamp);
    }
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={msg.senderId === currentUser.uid ? "message current-user" : "message other-user"}
          >
            {msg.senderId !== currentUser.uid && (
              <div className="sender-name">{msg.senderName}</div>
            )}
            <div className="message-text">{msg.text}</div>
            <div className="message-time" style={{ fontSize: '0.78em', color: '#888', marginTop: 4, textAlign: msg.senderId === currentUser.uid ? 'right' : 'left' }}>
              {formatTime(msg.timestamp)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input 
          type="text" 
          value={newMessage} 
          onChange={e => setNewMessage(e.target.value)} 
          placeholder="Type your message..." 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
