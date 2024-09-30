"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  Send,
  ChevronLeft,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { Message, selectedContact, Users } from "@/types/types";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";

export default function ChatPage() {
  const [selectedContact, setSelectedContact] =
  useState<selectedContact | null>(null);
const [users, setUsers] = useState<Users[]>([]);
const [showChat, setShowChat] = useState(false);
const [message, setMessage] = useState<string>("");
const [messages, setMessages] = useState<Message[]>([]);
const [chatid, setChatId] = useState<string>("");
const [currentUser, setCurrentUser] = useState(auth.currentUser);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      toast.error("User not authenticated");
      setCurrentUser(null);
    }
  });
  return () => unsubscribe();
}, []);

useEffect(() => {
  if (!currentUser) {
    toast.error("User not authenticated");
    return;
  }
}, [currentUser]);

const createChatId = (id1: string, id2: string): string => {
  return [id1, id2]
    .sort((a, b) => a.localeCompare(b)) // Sort the IDs
    .join("_"); // Join them with an underscore
};

const createChat = async () => {
  if (!currentUser || !selectedContact) {
    toast.error("Select a contact or ensure you're logged in");
    return;
  }
  const chatId = createChatId(currentUser?.uid, selectedContact?.uid);
  setChatId(chatId);
  const chatRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatRef);
  // Check if the chat already exists
  if (!chatDoc.exists()) {
    await setDoc(chatRef, {
      participants: [currentUser.uid, selectedContact.uid],
      lastMessage: "",
      lastMessagetimeStamp: null,
      unreadCount: 0,
    });
  }
};

const handleMessageSend = async () => {
  if (!message || !chatid) {
    toast.warning("Type something first");
    return;
  }

  try {
    console.log("Chat ID:", chatid); // Log chat ID

    // Ensure chatid is valid before proceeding
    if (!chatid || chatid.trim() === "") {
      throw new Error("Chat ID is not set correctly.");
    }

    const chatRef = doc(db, "chats", chatid);
    const chatDoc = await getDoc(chatRef);

    // Check if the chat already exists
    if (!chatDoc.exists()) {
      await setDoc(chatRef, {
        participants: [currentUser?.uid, selectedContact?.uid],
        lastMessage: "",
        lastMessagetimeStamp: null,
        unreadCount: 0,
      });
    }

    // Add message to the chat
    await addDoc(collection(db, "chats", chatid, "messages"), {
      senderId: currentUser?.uid,
      receiverId: selectedContact?.uid,
      text: message,
      timestamp: new Date().toISOString(),
      read: false,
    });

    // Update last message details in the chat document
    await updateDoc(doc(db, "chats", chatid), {
      lastMessage: message,
      lastMessageTimeStamp: new Date().toISOString(),
      unreadCount: 10, // Update as per your logic
    });

    setMessage(""); // Reset message input
  } catch (error: any) {
    if (error instanceof FirebaseError) {
      toast.error(`Error sending message: ${error.message}`);
    } else {
      toast.error(`Unexpected error: ${error.message}`);
    }
  }
};

// 2. Function to fetch messages based on chatid
const fetchMessages = async (
  chatid: string
): Promise<Message[] | undefined> => {
  if (!chatid || chatid.trim() === "") {
    console.error("Invalid chat ID provided.");
    return;
  }

  try {
    const messagesRef = collection(db, "chats", chatid, "messages");
    const messagesSnapshot = await getDocs(messagesRef);
    const messagesData: Message[] = messagesSnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Message[];

    return messagesData;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return undefined;
  }
};

// 3. useEffect to fetch messages when chatid changes
useEffect(() => {
  if (!chatid || chatid.trim() === "") {
    console.error("Chat ID is not valid in useEffect.");
    return;
  }

  const fetchMessageData = async () => {
    const loadMessages = await fetchMessages(chatid);
    if (loadMessages) {
      setMessages(loadMessages);
    }
  };

  fetchMessageData();
}, [chatid]);

// 4. Subscribe to real-time updates for the selected chat
useEffect(() => {
  if (!chatid || chatid.trim() === "") {
    return;
  }
  const messageRef = collection(db, "chats", chatid, "messages");
  const messageQuery = query(messageRef, orderBy("timestamp", "asc"));
  const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
    const messagesData: Message[] = snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Message[];
    setMessages(messagesData);
  });

  return () => unsubscribe(); // Cleanup on unmount
}, [chatid]);

useEffect(() => {
  const fetchUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersData: Users[] = querySnapshot.docs
      .map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }))
      .filter((user) => user.uid !== currentUser?.uid) as Users[];

    setUsers(usersData);
  };
  fetchUser();
}, [currentUser]);

const handleContactClick = async (contact: Users) => {
  setSelectedContact(contact);
  const chatId = createChatId(currentUser?.uid as string, contact?.uid); // Use new chat ID generation logic
  setChatId(chatId);
  setShowChat(true);
  await createChat();
};

const handleBackToContacts = () => {
  setShowChat(false);
};

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setShowChat(false);
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-100">
      <AnimatePresence initial={false}>
        {(!showChat || window.innerWidth > 768) && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-1/3 lg:w-1/4 border-r border-purple-500/30 bg-gray-800/50 backdrop-blur-md"
          >
            <div className="p-4 bg-gray-800/70">
              <h2 className="text-2xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                <MessageCircle className="w-6 h-6 mr-2 text-blue-500" />
                Chats
              </h2>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
              {users.map((user) => (
                <motion.div
                  key={user.uid}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleContactClick(user)}
                  className="p-4 border-b border-purple-500/30 cursor-pointer"
                >
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={user.profilePic} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{user.username}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        No message to display
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {(showChat || window.innerWidth > 768) && selectedContact && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full bg-gray-800/50 backdrop-blur-md"
          >
            <div className="p-4 bg-gray-800/70 flex items-center border-b border-purple-500/30">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                onClick={handleBackToContacts}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Avatar className="w-10 h-10 mr-4">
                <AvatarImage
                  src={selectedContact.profilePic}
                  alt={selectedContact.username}
                />
                <AvatarFallback>
                  {selectedContact.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-bold">{selectedContact.username}</h2>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
              >
                <MoreVertical className="w-6 h-6" />
              </Button>
            </div>

            <ScrollArea className="flex-grow p-4">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-3 rounded-lg w-fit max-w-[60%] flex flex-col ${
                      msg.senderId === currentUser?.uid
                        ? "bg-blue-500 text-white self-end ml-auto"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {/* Message Text */}
                    <div>{msg.text}</div>

                    {/* Displaying the timestamp at the bottom right */}
                    <div className="text-xs text-gray-400 mt-1 self-end">
                      {msg?.timeStamp
                        ? new Date(msg.timeStamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Invalid Date"}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No messages yet.</p>
              )}
            </ScrollArea>

            <div className="p-4 bg-gray-800/70 border-t border-purple-500/30">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                >
                  <Smile className="w-5 h-5" />
                </Button>
                <Input
                  className="flex-grow mx-4 bg-gray-800/30 border-gray-700 text-gray-300"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleMessageSend();
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/50"
                  onClick={handleMessageSend}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
