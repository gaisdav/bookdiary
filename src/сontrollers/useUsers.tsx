import { ref, onValue } from "firebase/database";
import { db } from "../firebase.config.ts";
import { useEffect, useState } from "react";
import { IUser } from "../enitites/user";

const key = "users/";
export const useUsersController = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const dbRef = ref(db, key);
    onValue(dbRef, (snapshot) => {
      const data: IUser[] = [];

      snapshot.forEach((childSnapshot) => {
        data.push(childSnapshot.val());
      });

      setUsers(data);
    });
  }, []);

  return { users };
};
