import React, { useEffect, useState } from "react";
import { chatService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { COMPANION_TYPE, ROLES, VOICES } from "../../constants/AppConstant";
import Header from "../../components/header/Header";
import NavDrawer from "../../components/navDrawer/NavDrawer";
import maleImage from "../../assets/images/male-logo.png";
import femaleImage from "../../assets/images/female-logo.png";
import defaultMaleImage from "../../assets/images/default-image-male.png";
import defaultFemaleImage from "../../assets/images/default-image-female.png";
import "./ChatHistory.css";
import { formatDate } from "../../utils/DateUtil";

function ChatHistory() {
  const userProfile = useSelector((state) => state.userProfile);
  const userChat = useSelector((state) => state.userChat);
  const [selectedChat, setselectedChat] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatService.getChatHistory(userProfile?.data));
  }, []);

  useEffect(() => {
    if (userChat.chatHistory.length > 0)
      setselectedChat(userChat.chatHistory[userChat.chatHistory.length - 1].id);
  }, [userChat.chatHistory]);

  const selectChatHistory = (chatId) => {
    setselectedChat(chatId);
  };

  return (
    <div>
      <Header />
      <NavDrawer />
      <div className="content-chat mt-20 chat-history-container">
        <div className="content-chat-user">
          <div className="head-search-chat">
            <div className="text-center chat-history-title">Chat History</div>
          </div>
          <div className="list-search-user-chat mt-20">
            {userChat?.chatHistory &&
              userChat?.chatHistory.reverse().map((chat, index) => (
                <div 
                  key={index}
                  className={`user-chat ${chat?.id === selectedChat && 'active'}`}
                  data-username={chat?.avatarPreference?.name || VOICES[0].name}
                  onClick={() => selectChatHistory(chat?.id)}
                >
                  <div className="user-chat-img">
                    {chat?.avatarPreference?.companionType === "Female" ? (
                      <img src={femaleImage} alt="logo" />
                    ) : (
                      <img src={maleImage} alt="logo" />
                    )}
                  </div>

                  <div className="user-chat-text">
                    <p className="mt-0 mb-0">
                      <strong>
                        {chat?.avatarPreference?.name || VOICES[0].name}
                      </strong>
                    </p>
                    <small>{formatDate(chat.createdAt)}</small>
                  </div>
                </div>
              ))}
            {userChat.error?.errorCode === "CHAT_HISTORY_NOT_FOUND" && (
              <div className="user-chat-text">
                <p className=" text-center mt-2 mb-2">
                  <strong>Chat History Not Found</strong>
                </p>
              </div>
            )}
          </div>
        </div>
        {userChat?.chatHistory &&
          userChat?.chatHistory.reverse()
            .filter((chat) => chat.id === selectedChat)
            .map((chat, index) => (
              <div
                className="content-chat-message-user active"
                data-username="Maria Dennis"
                key={index}
              >
                <div className="head-chat-message-user">
                  {chat?.avatarPreference?.companionType ===
                  COMPANION_TYPE.FEMALE ? (
                    <img src={femaleImage} alt="logo" />
                  ) : (
                    <img src={maleImage} alt="logo" />
                  )}
                  <div className="message-user-profile">
                    <p className="mt-2 mb-2 text-white">
                      <strong>
                        {chat?.avatarPreference?.name || VOICES[0].name}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="body-chat-message-user">
                  {chat?.chatList.map((chatHistory, index) => (
                    <div key={index}>
                      {chatHistory.role === ROLES.ASSISTANT && (
                        <div className="message-user-left">
                          <div className="message-user-left-img">
                            {chat?.avatarPreference?.companionType ===
                            COMPANION_TYPE.FEMALE ? (
                              <img src={femaleImage} alt="logo" />
                            ) : (
                              <img src={maleImage} alt="logo" />
                            )}
                            <p className="mt-0 mb-0">
                              <strong>
                                {chat?.avatarPreference?.name || VOICES[0].name}
                              </strong>
                            </p>
                          </div>
                          <div className="message-user-left-text">
                            <strong>{chatHistory.content}</strong>
                          </div>
                        </div>
                      )}
                      {chatHistory.role === ROLES.USER && (
                        <div className="message-user-right">
                          <div className="message-user-right-img">
                            <p className="mt-0 mb-0">
                              <strong>
                                {userProfile?.data?.firstName +
                                  " " +
                                  userProfile?.data?.lastName}
                              </strong>
                            </p>
                            {userProfile?.data?.gender ===
                            COMPANION_TYPE.FEMALE ? (
                              <img src={defaultFemaleImage} alt="logo" />
                            ) : (
                              <img src={defaultMaleImage} alt="logo" />
                            )}
                          </div>
                          <div className="message-user-right-text">
                            <strong>{chatHistory.content}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ChatHistory;
