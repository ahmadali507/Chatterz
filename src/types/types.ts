export type selectedContact = {
    uid : string,
    username : string, 
    profilePic ?: string, 
    lastMessage ?: string,
    unreadCount ?: number, 
  }
 export  type Users = {
    username: string, 
    email : string, 
    uid : string, 
    profilePic ?: string, 
    online?:Boolean, 

  }
 export  type Message = {
    senderId : string, 
    receiverId : string, 
    text : string,
    timeStamp : string, 
    read ?: Boolean, 
  }

 export type Chat = {
    chatId : string, 
    lastMessage: string, 
    unreadCount : number,
    messages ?: Message[], 
    lastMessageTimeStamp : string, 
  }