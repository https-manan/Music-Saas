import { getServerSession } from "next-auth";
import { Appbar } from "./components/AppBar";
import Body from './components/Body'
import Main from './components/Main'
import Render from "./components/Render";

export default function Home() {
  return (
    <div>
      <Appbar/>
      <Render/>
    </div>
  );
}
