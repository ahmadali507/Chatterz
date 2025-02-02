import { auth, db } from "@/firebase/firebaseConfig";
import { Users } from "@/types/types";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

import { Dispatch, SetStateAction } from "react";

type userContextProviderType = {
  currentUser: Users | null;
  setCurrentUser: Dispatch<SetStateAction<Users | null>>;
};
const userContext = createContext<userContextProviderType | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<Users | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        /// sicne we have got the user from the firebase authentication. Now we need to fetch the user's data from cloud firestore.
        const q = query(
          collection(db, "users"),
          where("email", "==", user?.email)
        );
        const querySnapshot = await getDocs(q);
        const myuser = querySnapshot.docs.map((doc) =>
          doc.data()
        )[0] as Users;
        setCurrentUser(myuser);
      } else {
        setCurrentUser(null);
        return () => unsubscribe();
      }
    });
    }, []);

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userContext.Provider>
  );
};


export const useCurrentUser = () =>{
    const context = useContext(userContext); 
    if(!context){
      throw new Error("useCurrentUser must be used within a UserContextProvider");
    }
    return context; 
}