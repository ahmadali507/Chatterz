'use server'

import { db } from "@/firebase/firebaseConfig";
import { Message } from "@/types/types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";


   export  const fetchMessages = async (
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
  