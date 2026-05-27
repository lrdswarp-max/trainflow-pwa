import { useState, useEffect, useRef } from 'react';
import { useNetworkStatus } from '@/shared/hooks/useNetworkStatus';
import { db, type ChatMessage } from '@/core/db/db';
import { useLiveQuery } from 'dexie-react-hooks';

export function useChat(currentUserId: string, otherUserId: string) {
  const isOnline = useNetworkStatus();
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const messages = useLiveQuery(
    () => db.messages
      .where('senderId').anyOf(currentUserId, otherUserId)
      .toArray()
      .then(msgs => 
        msgs.filter(m => m.receiverId === currentUserId || m.receiverId === otherUserId)
            .sort((a, b) => a.timestamp - b.timestamp)
      ),
    [currentUserId, otherUserId]
  ) ?? [];

  useEffect(() => {
    if (!isOnline) {
      setIsConnected(false);
      return;
    }

    const socketUrl = `ws://localhost:8000/api/v1/chat/ws/${currentUserId}`;
    const socket = new WebSocket(socketUrl);
    ws.current = socket;

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    
    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        await db.messages.put({
          id: data.id || crypto.randomUUID(),
          senderId: data.senderId,
          receiverId: currentUserId,
          content: data.content,
          status: 'sent',
          timestamp: data.timestamp || Date.now()
        });
      } catch (err) {
        console.error('Failed to parse incoming message', err);
      }
    };

    return () => {
      socket.close();
    };
  }, [isOnline, currentUserId]);

  const sendMessage = async (content: string) => {
    const messageId = crypto.randomUUID();
    const newMsg: ChatMessage = {
      id: messageId,
      senderId: currentUserId,
      receiverId: otherUserId,
      content,
      status: isOnline && isConnected ? 'sent' : 'pending',
      timestamp: Date.now()
    };

    await db.messages.add(newMsg);

    if (isOnline && isConnected && ws.current) {
      ws.current.send(JSON.stringify(newMsg));
    }
  };

  return { messages, sendMessage, isConnected };
}
