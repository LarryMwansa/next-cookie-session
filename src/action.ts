"use server"

import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "./lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

let username = "John";
let isPro = true;

export const getSession = async ()=>{
    
    const session = await getIronSession<SessionData>(cookies(),sessionOptions)
    if(!session.isLoggedIn){
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}


export const login = async (prevState:{error:undefined | string},formData:FormData)=>{
    const session = await getSession()
    const formUsername = formData.get("username")?.toString()
    const formPassword = formData.get("password")?.toString()

    // Check User in DB
    // const user = await db.getUser(formUsername,formPassword)

    if (formUsername !== username){
        return { error: "Wrong Credentials" }
    }

    session.userId = 1;
    session.username = formUsername;
    session.isPro = isPro;
    session.isLoggedIn = true;

    await session.save();
    redirect("/")
}


export const logout = async ()=>{
    const session = await getSession()
    session.destroy();
    redirect("/")
}


export const changePremium = async () => {
  const session = await getSession();

  // Check User in DB
  // const user = await db.getUser(session.username, session.password)
  isPro = !session.isPro;
    session.isPro = isPro;
  await session.save();
  revalidatePath("/profile");

}

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};