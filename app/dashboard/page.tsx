import {getSession} from "@utility/getSession";
import {redirect} from "next/navigation";
import SignOutButton from "@app/dashboard/SignOutButton";

export default async function Component() {
  const session = await getSession();

  if (!session || !session.user) {
    return redirect('/signin');
  }

  return (
    <div>
      <div>Just for a second imagine this is the main dashboard</div>
      <div>Your identity:</div>
      <div>Name: {session.user.name}</div>
      <div>Email: {session.user.email}</div>
      <div>Image: {session.user.image}</div>
      <div>Expires at: {session.expires}</div>
      <br />
      <div>To log out click the button below</div>
      <SignOutButton />
    </div>);
}