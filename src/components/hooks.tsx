import { useEffect, useState } from "react";

interface IUserAPIUser {
  firstname: string;
  lastname: string;
  email: string;
  name: string;
  displayName: string;
  scopes: string;
}

export function useUser() {
  const [user, setUser] = useState<IUserAPIUser>({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@techsqode.com",
    name: "John Doe",
    displayName: "John Doe",
    scopes: "user,admin,abc",
  });

  useEffect(() => {
    fetch("/user-api/currentUser")
      .then((response) => response.json())
      .then(setUser);
  }, []);

  return user;
}
