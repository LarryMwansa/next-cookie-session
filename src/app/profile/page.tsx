import { changePremium, changeUsername, getSession } from '@/action'
import { redirect } from 'next/navigation';
import React from 'react'

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
    return null; // Ensure the function exits after redirecting
  }

  return (
    <div className='profile'>
      <h1>Welcome To the Profile Page</h1>
      <p>Welcome, <b>{session.username}</b></p>
      <span>You are a <b>{session.isPro ? "Premium" : "Free"}</b> user</span>
      
      <form action={changePremium}>
        <button>{session.isPro ? "Cancel" : "Buy"} Premium</button>
      </form>

      <form action={changeUsername}>
        <input type="text" name="username" required placeholder={session.username} />
        <button>Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;