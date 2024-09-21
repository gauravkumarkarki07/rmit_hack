import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/views/Index";

function App() {
  return(
    <section className="flex w-full">
    <section className="w-[25%]">
    <Sidebar/>
    </section>
    <section className="w-full">
      <Outlet />
    </section>
  </section>
  )
}

export default App;