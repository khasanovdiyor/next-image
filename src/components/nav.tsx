import NavBar from "./navbar";
import { auth } from "@/auth";

export default async function Nav() {
  const session = await auth();

  return <NavBar session={session} />;
}
