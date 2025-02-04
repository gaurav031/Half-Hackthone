import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatWidget({onClose}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);

  const handleUserResponse = (option) => {
    let response = "";
    if (option === "Complain") {
      response = "Please describe your complaint, and we'll assist you.";
    } else if (option === "Help") {
      response = "What do you need help with? Let me know!";
    }
    setMessages([...messages, { text: option, sender: "user" }, { text: response, sender: "bot" }]);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {isOpen && (
        <div className="w-72 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 border border-gray-200">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-bold text-lg">Chat Support</span>
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-60">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  msg.sender === "bot" ? "bg-gray-100 text-left" : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" onClick={() => handleUserResponse("Complain")}>
              Complain
            </Button>
            <Button variant="outline" onClick={() => handleUserResponse("Help")}>
              Help
            </Button>
          </div>
        </div>
      )}
      <Button
        className="rounded-full p-3 shadow-lg bg-blue-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    </div>
  );
}
