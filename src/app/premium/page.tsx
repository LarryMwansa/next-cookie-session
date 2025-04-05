import React from 'react';
import Link from "next/link";
import { redirect } from "next/navigation";

const PremiumPage = () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className="premium">
      <h1>Welcome to the Premium Page</h1>
      <p>Only premium users can see the content!</p>

    </div>
  )
}

export default PremiumPage