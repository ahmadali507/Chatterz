
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
    createdAt ?: string,
    bio ?: string | null,  
    location ?: string


  }
 export  type Message = {
    senderId : string, 
    receiverId : string, 
    text : string,
    timestamp : string, 
    read ?: Boolean, 
  }

 export type Chat = {
    chatId : string, 
    lastMessage: string, 
    unreadCount : number,
    messages ?: Message[], 
    lastMessageTimeStamp : string, 
  }

  export type FeatureCardType = {
    icon : any, 
    title : string,
    description : string, 
  }

  export type StatCardType = {
    icon : any, 
    value : number | string, 
    label : string, 
  }