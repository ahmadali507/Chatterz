
export type selectedContact =  Users & {
     username : string, 
  }
 export  type Users = {
    firstName ?: string, 
    lastName ?: string,   
    name: string, 
    email : string, 
    uid : string, 
    profilePic ?: string, 
    online?:Boolean, 
    createdAt ?: string,
    bio ?: string | null,  
    location ?: string, 
    username ?: string,
    mutualFriends?: number, 
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

  export type MyUser = {
    createdAt : Date | any, 
    email : string, 
    firstName : string, 
    lastName : string, 
    username : string, 
    password : string, 
    profilePic : string | URL | any,
    uid : string, 

  } 