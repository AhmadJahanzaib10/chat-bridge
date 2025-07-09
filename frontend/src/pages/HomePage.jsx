import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import LanguageSelector from "../components/LangaugeSelector";
import { useEffect, useState } from "react";
const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [barOpen, setBarOpen] = useState(false);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 xl:px-4 lg:px-0">
        <div className="bg-base-100 relative rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>

            {!selectedUser ? <NoChatSelected /> : <ChatContainer barOpen={barOpen} setBarOpen={setBarOpen}/>}
            {selectedUser ? <LanguageSelector barOpen={barOpen} setBarOpen={setBarOpen}/> : null}

          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
