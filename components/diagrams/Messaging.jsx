import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { CiChat1 } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TbClipboardCopy } from "react-icons/tb";
import ChatMessage from "@/classes/chatMessage";
import MessageHolder from "@/components/diagrams/MessageHolder";
import { baseBeUrl } from "@/urls/be";
import useFetchRequest from "@/hooks/useFetch";
import { LuMessageCircleMore } from "react-icons/lu";
import { BiMessageRounded } from "react-icons/bi";

const Messaging = ({ diagramId, diagramName }) => {
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const [messagesOpen, setMessagesOpen] = useState(false);

  const messageContainer = useRef(null);
  const messageInputRef = useRef(null);
  const { userToken } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState(false);

  const transformApiMessages = (messages) => {
    return messages.map((message) => {
      return new ChatMessage({
        senderName: `${message.sender.first_name} ${message.sender.last_name}`,
        messageBody: `${message.message}`,
        timestamp: `${message.created_at}`,
        senderImageUrl: `${message.sender.profile_picture}`,
      });
    });
  };
  const chatMessagesUrl = `${baseBeUrl}/chat/messages/${diagramId}`;
  const { mutate: getDiagramMessages, isLoading: isGettingMessages } =
    useFetchRequest(
      chatMessagesUrl,
      (response) => {
        setChatMessages(transformApiMessages(response.data));
      },
      (error) => {
        toast({
          title: "Could not get chat messages",
          variant: "destructive",
        });
      }
    );

  useEffect(() => {
    getDiagramMessages();
  }, []);

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messagesOpen, chatMessages]);

  useEffect(() => {
    const websocket = new WebSocket(
      `${baseBeUrl}/ws/diagram/chat/${diagramId}/?token=${userToken}&did=${diagramId}`
    );
    websocket.onopen = () => {
      setIsSocketConnected(true);
      console.log("websocket connection established");
    };

    websocket.onmessage = (evt) => {
      console.log("message received");
      const body = JSON.parse(evt.data);

      const newMessage = new ChatMessage({
        senderName: body.sender_name,
        senderImageUrl: body.profile_url,
        timestamp: body.timestamp,
        messageBody: body.message_body,
      });

      setChatMessages((prev) => [...prev, newMessage]);
      setNewMessage(true);
    };

    websocket.onclose = () => {
      console.log("websocket connection closed");
    };

    setSocket(websocket);

    return () => {
      websocket.close();
    };
  }, []);
  const handleMessageFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const message = formData.get("message");

    if (message == "") return;

    socket.send(
      JSON.stringify({
        action: "chat_message",
        message_body: message,
      })
    );

    if (messageInputRef.current) {
      messageInputRef.current.value = "";
    }
  };

  const handlePopoverOpen = (open) => {
    setMessagesOpen(open);
    setNewMessage(false);
    if (open) {
      setTimeout(() => {
        if (messageContainer.current) {
          messageContainer.current.scrollTop =
            messageContainer.current.scrollHeight;
        }
      }, 0); // Ensure the DOM is updated before scrolling
    }
  };

  const getDate = (dateString) => {
    return new Date(dateString).getDate();
  };

  const getFullDate = (dateString) => {
    const date = new Date(dateString);
    if (date) {
      const formattedDate = date.toLocaleString("en-US", {
        weekday: "long",

        month: "long",
        year: "numeric",
      });
      return formattedDate;
    }
  };

  return (
    <div >
      <Popover className="" onOpenChange={(open) => handlePopoverOpen(open)}>
        <PopoverTrigger>
          <div className="">
            <div className="bg-white cursor-pointer rounded-md flex flex-row items-center gap-2 p-2 border border-[#878787] relative">
              <div className="relative">
                <BiMessageRounded color="#878787" />

                {newMessage && !messagesOpen && (
                  <div className="w-[5px] h-[5px] rounded-full bg-[#ff0000] absolute top-0 right-0"></div>
                )}
              </div>
              <p className="font-medium text-sm text-gray-500">Messages</p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 rounded-t-lg overflow-hidden w-[350px]">
          <div className="w-full h-full flex flex-col ">
            <div className="bg-green01 p-3">
              <p className="font-medium text-sm text-white">Messages</p>
            </div>

            <div className="w-full h-[350px] flex flex-col items-center justify-between">
              <div
                className="w-full p-2 overflow-y-scroll no-scrollbar flex flex-col gap-3 scroll-smooth"
                ref={messageContainer}
              >
                {chatMessages.map((message, index) => {
                  const previousMessage =
                    index == 0 ? null : chatMessages[index - 1];

                  return (
                    <div key={`d-message-${index}`}>
                      {getDate(previousMessage?.timestamp) !==
                        getDate(message.timestamp) && (
                        <div className="w-full flex items-center justify-center my-2">
                          <p className="text-center opacity-40 text-[0.7rem]">
                            {getFullDate(message.timestamp)}
                          </p>
                        </div>
                      )}
                      <MessageHolder
                        message={message.messageBody}
                        senderName={message.senderName}
                        senderImageUrl={message.senderImageUrl}
                        timestamp={message.timestamp}
                      />
                    </div>
                  );
                })}
              </div>

              <form
                className="bg-chatinput w-[97%] mb-2 p-2 flex flex-col rounded-md"
                onSubmit={handleMessageFormSubmit}
              >
                <textarea
                  name="message"
                  className="outline-none border-none rounded-md bg-chatinput text-sm resize-none"
                  placeholder="Enter your message"
                  id=""
                  ref={messageInputRef}
                ></textarea>

                <div className="w-full flex flex-row items-center justify-between">
                  <div>
                    <TbClipboardCopy
                      color="#868686"
                      className="cursor-pointer"
                    />
                  </div>
                  <input
                    type="submit"
                    value="Send"
                    className="self-end bg-black text-white text-sm mt-2 py-2 px-5 cursor-pointer rounded-md"
                  />
                </div>
              </form>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Messaging;
