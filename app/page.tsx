import { DynamicWidget } from "../lib/dynamic";
import Home  from "./home/page"
export default function Main() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Blockfolio</h1>
       
        <DynamicWidget />
        <Home/>
      </div>
    
    </div>
  );
}
