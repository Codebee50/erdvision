import React, { useState, useEffect } from "react";
import { PiAirTrafficControl } from "react-icons/pi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { Writer } from "@/classes/writerConfig";
import { baseBeUrl } from "@/urls/be";
import usePostRequest from "@/hooks/usePost";
import { toast } from "@/hooks/use-toast";
import { handleGenericError } from "@/utils/errorHandler";
import ShuffleLoader from "../ShuffleLoader";

const AccessControl = ({ diagram, writer, onWriterChanged = () => {} }) => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  const [writeRequests, setWriteRequests] = useState([]);

  const postRequest = usePostRequest();

  const { mutate: grantAccess, isLoading: isGrantingAccess } = postRequest(
    `${baseBeUrl}/diagram/access/grant/`,
    (response) => {
      toast({
        description: "Access successfully changed",
      });

      if (socket) {
        socket.send(
          JSON.stringify({
            action: "ACCESS_CHANGED",
            userId: response.data.data.id,
            email: response.data.data.email,
          })
        );
      }
    },
    (error) => [
      toast({
        description: handleGenericError(error),
        variant: "destructive",
      }),
    ]
  );

  useEffect(() => {
    const websocket = new WebSocket(
      `${baseBeUrl}/ws/diagram/access/?token=${userToken}&did=${diagram?.id}`
    );
    websocket.onopen = () => {
      console.log("access websocket connected");
    };

    websocket.onmessage = (event) => {
      const body = JSON.parse(event.data);
      if (body.action == "ACCESS_REQUEST") {
        const requestingWriter = new Writer(body.userId, body.email);
        setWriteRequests((prev) => [...prev, requestingWriter]);
      }

      if (body.action == "ACCESS_CHANGED") {
        const newWriter = new Writer(body.userId, body.email);
        onWriterChanged(newWriter)
      }
    };

    setSocket(websocket);

    return () => {
      websocket.close();
    };
  }, [userInfo?.id, diagram?.id]);

  const handleRequestAccess = () => {
    socket.send(
      JSON.stringify({
        action: "ACCESS_REQUEST",
        userId: userInfo?.id,
        email: userInfo?.email,
      })
    );
  };

  const handleGrantRequest = (requestingWriter) => {
    grantAccess({
      grant_to: requestingWriter.id,
      diagram: diagram?.id,
    });
  };

  const handleSeizeAccess = () => {
    grantAccess({
      grant_to: diagram?.creator?.id,
      diagram: diagram?.id,
    });
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex flex-row p-2 border border-[#878787] gap-2 rounded-md items-center">
            <PiAirTrafficControl color="#878787" />
            <div className="flex flex-col">
              <p className="font-medium text-sm text-gray-500 max-w-[70px] text-nowrap overflow-hidden overflow-ellipsis">
                {writer?.email}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] rounded-t-lg p-0 overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <div className="bg-green02 p-3">
              <p className="font-medium text-sm text-black">Access control</p>
            </div>

            <div className="w-full h-max bg-white p-3">
              <div className="flex flex-row flex-wrap gap-1">
                <p className="text-green01 font-semibold text-sm">
                  Write access held by:
                </p>

                <p className="text-[0.8rem] text-green01 opacity-55">
                  {writer?.email}
                </p>
              </div>

              <div className="flex flex-col mt-4 gap-2 min-h-[100px] max-h-[300px] overflow-y-scroll no-scrollbar">
                <p className="text-green01 font-semibold text-sm">
                  Write requests:
                </p>

                {writeRequests.filter((request)=> request.email !== userInfo?.email).map((request) => {
                  console.log(request.email);
                  return (
                    <div
                      className="w-full flex flex-row items-center justify-between"
                      key={`writer-${request.id}`}
                    >
                      <p className="text-[0.8rem] text-green01 opacity-55">
                        {request?.email}
                      </p>

                      {userInfo?.id == writer?.id && (
                        <div>
                          {isGrantingAccess ? (
                            <ShuffleLoader />
                          ) : (
                            <p
                              className="text-sm text-blue01 cursor-pointer"
                              onClick={handleGrantRequest.bind(null, request)}
                            >
                              Grant
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-row items-center gap-2">
                {userInfo?.id == diagram?.creator?.id && (
                  <button
                    onClick={handleSeizeAccess}
                    className="w-full border border-gray-400 rounded-md outline-none mt-5 p-3 text-sm text-gray-400"
                  >
                    Seize access
                  </button>
                )}

                {userInfo?.id !== writer?.id && (
                  <button
                    className="w-full border border-gray-400 rounded-md outline-none mt-5 p-3 text-sm text-gray-400"
                    onClick={handleRequestAccess}
                  >
                    Request access
                  </button>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccessControl;
