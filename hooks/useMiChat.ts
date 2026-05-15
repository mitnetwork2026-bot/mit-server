'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  ref,
  query,
  orderByChild,
  onValue,
  push,
  set,
  update,
  remove,
} from 'firebase/database';
import { database } from '@/lib/firebase';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderProfileImage: string;
  text: string;
  timestamp: number;
  seenBy: { [key: string]: boolean };
  reactions: { [key: string]: string };
  type: 'text' | 'photo' | 'voice';
  isEdited?: boolean;
  editedAt?: number;
}

export interface ChatUser {
  id: string;
  displayName: string;
  profileImage: string;
  status: 'online' | 'offline';
  lastSeen: number;
  isTyping: boolean;
}

const ADMIN_ID = 'abdulmazidf55@gmail.com';

export function useMiChat() {
  const { user, userProfile } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const messagesRef = ref(database, 'chats/miChat/messages');
    const messagesQuery = query(messagesRef, orderByChild('timestamp'));

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.entries(data)
          .map(([key, val]: any) => ({
            id: key,
            ...val,
          }))
          .sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messagesList);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const usersRef = ref(database, 'chats/miChat/users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersList = Object.entries(data).map(([key, val]: any) => ({
          id: key,
          ...val,
        }));
        setUsers(usersList);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || !userProfile) return;

    const userRef = ref(database, `chats/miChat/users/${user.uid}`);
    set(userRef, {
      id: user.uid,
      displayName: userProfile.displayName,
      profileImage: userProfile.profileImage,
      status: 'online',
      lastSeen: Date.now(),
      isTyping: false,
    });

    return () => {
      update(userRef, {
        status: 'offline',
        lastSeen: Date.now(),
      });
    };
  }, [user, userProfile]);

  const sendMessage = useCallback(
    async (text: string, type: 'text' | 'photo' | 'voice' = 'text') => {
      if (!user || !userProfile) return;

      const messagesRef = ref(database, 'chats/miChat/messages');
      const newMessage = {
        senderId: user.uid,
        senderName: userProfile.displayName,
        senderProfileImage: userProfile.profileImage,
        text,
        timestamp: Date.now(),
        seenBy: { [user.uid]: true },
        reactions: {},
        type,
        isEdited: false,
      };

      try {
        await push(messagesRef, newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    [user, userProfile]
  );

  const deleteMessage = useCallback(
    async (messageId: string) => {
      if (!user || user.email !== ADMIN_ID) {
        console.error('Only admin can delete messages');
        return;
      }

      try {
        await remove(ref(database, `chats/miChat/messages/${messageId}`));
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    },
    [user]
  );

  const editMessage = useCallback(
    async (messageId: string, newText: string) => {
      if (!user || user.email !== ADMIN_ID) {
        console.error('Only admin can edit messages');
        return;
      }

      try {
        await update(ref(database, `chats/miChat/messages/${messageId}`), {
          text: newText,
          isEdited: true,
          editedAt: Date.now(),
        });
      } catch (error) {
        console.error('Error editing message:', error);
      }
    },
    [user]
  );

  const markAsSeen = useCallback(
    async (messageId: string) => {
      if (!user) return;

      try {
        await update(
          ref(database, `chats/miChat/messages/${messageId}/seenBy`),
          { [user.uid]: true }
        );
      } catch (error) {
        console.error('Error marking as seen:', error);
      }
    },
    [user]
  );

  const setTyping = useCallback(
    (typing: boolean) => {
      if (!user) return;

      const typingRef = ref(database, `chats/miChat/typing/${user.uid}`);

      if (typing) {
        set(typingRef, true);

        if (typingTimeout.current) {
          clearTimeout(typingTimeout.current);
        }

        typingTimeout.current = setTimeout(() => {
          remove(typingRef);
        }, 3000);
      } else {
        remove(typingRef);
      }
    },
    [user]
  );

  const addReaction = useCallback(
    async (messageId: string, emoji: string) => {
      if (!user) return;

      try {
        await update(
          ref(database, `chats/miChat/messages/${messageId}/reactions`),
          { [user.uid]: emoji }
        );
      } catch (error) {
        console.error('Error adding reaction:', error);
      }
    },
    [user]
  );

  return {
    messages,
    users,
    sendMessage,
    deleteMessage,
    editMessage,
    markAsSeen,
    setTyping,
    addReaction,
    isAdmin: user?.email === ADMIN_ID,
  };
}

