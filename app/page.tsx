import Image from "next/image";
import App from './App'
import { ContextProvider} from './context/GlobalContent'
import { Toaster } from "react-hot-toast";
export default function Home() {
  return (
    <div className="flex w-full h-svh justify-center items-center bg-purple-600">
   <ContextProvider>
   <App />
   <Toaster/>
   </ContextProvider>
    </div>
  );
}


