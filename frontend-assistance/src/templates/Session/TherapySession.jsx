import React, { useEffect, useState } from "react";
import { FemaleAvatar, MaleAvatar } from "../../components/avatar";
import Mic from "../../components/mic/Mic";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  GREET_MESSAGES,
  ROLES,
  SYSTEM_PROMPT,
  VOICES,
} from "../../constants/AppConstant";
import { getRandomInt } from "../../utils/RandomUtil";
import { chatService } from "../../services";
import { isObjectEmpty } from "../../utils/ObjectUtil";
import "./TherapySession.css";
import { clearUserChatData } from "../../actions/ChatActionCreators";

function TherapySession({ handleSession }) {
  const userProfile = useSelector((state) => state.userProfile);
  const userChat = useSelector((state) => state.userChat);

  const dispatch = useDispatch();
  const { listening, transcript, resetTranscript } = useSpeechRecognition();
  const [listenTimeout, setListenTimeout] = useState(null);
  const synth = window.speechSynthesis;

  useEffect(() => {
    let statement = GREET_MESSAGES[getRandomInt(0, GREET_MESSAGES.length - 1)];
    statement = statement.replace("user_name", userProfile?.data?.firstName);
    statement = statement.replace(
      "companion_name",
      userProfile?.data?.avatarPreference?.name || VOICES[0].name
    );
    if (isObjectEmpty(userChat.chats?.id))
      dispatch(
        chatService.startUserSession({
          emailAddress: userProfile?.data?.emailAddress,
          avatarPreference: userProfile?.data?.avatarPreference,
          chatList: [
            {
              role: ROLES.SYSTEM,
              content: SYSTEM_PROMPT,
            },
            {
              role: ROLES.ASSISTANT,
              content: statement,
            },
          ],
        })
      );
    speakSynthesisHandler(statement, () => {
      startListening();
    });
  }, [userProfile]);

  useEffect(() => {
    if (
      !isObjectEmpty(userChat?.chats?.chatList) &&
      userChat?.chats?.chatList.length > 2
    ) {
      const chatList = userChat?.chats?.chatList;
      const lastConversation = chatList[chatList.length - 1];
      if (lastConversation.role === ROLES.ASSISTANT) {
        speakSynthesisHandler(lastConversation.content, () => {
          startListening();
        });
      }
    }
  }, [userChat?.chats]);
  useEffect(() => {
    return () => {
      stopSession();
      dispatch(clearUserChatData());
    };
  }, []);

  useEffect(() => {
    if (transcript !== "") {
      clearTimeout(listenTimeout);

      const newListenTimeout = setTimeout(() => {
        stopListening();
      }, 3000);

      setListenTimeout(newListenTimeout);
    }
  }, [transcript]);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const getNextStatement = (statement) => {
    dispatch(
      chatService.getNextStatement({
        id: userChat?.chats?.id,
        emailAddress: userProfile?.data?.emailAddress,
        avatarPreference: userProfile?.data?.avatarPreference,
        chatList: [
          ...userChat?.chats?.chatList,
          {
            role: ROLES.USER,
            content: statement,
          },
        ],
      })
    );
  };

  const stopListening = () => {
    getNextStatement(transcript);
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const stopSession = () => {
    if (listening) stopListening();
    if (synth.speaking) stopSynthesisHandler();
  };

  const onCloseHandler = () => {
    stopSession();
    handleSession(false);
  }

  const speakSynthesisHandler = (statement, onEndCallback) => {
    if (listening) {
      stopListening();
      resetTranscript();
    }
    var utterance = new SpeechSynthesisUtterance(statement);
    const avatarPreference = userProfile?.data?.avatarPreference;
    if (synth.getVoices().length) {
      utterance.voice = synth.getVoices()[avatarPreference?.key || VOICES[1]?.key];
      synth.speak(utterance);
      utterance.onend = () => {
        onEndCallback();
      };
    } else {
      synth.onvoiceschanged = () => {
        utterance.voice = synth.getVoices()[avatarPreference?.key];
        synth.speak(utterance);
        utterance.onend = () => {
          onEndCallback();
        };
      };
    }
  };

  const stopSynthesisHandler = () => {
    synth.cancel();
  };

  return (
    <div>
      <div
        className="session__close_icon"
        onClick={onCloseHandler}
      ></div>
      { listening || userChat.loading ? (
        <Mic transcript={transcript} loading={userChat.loading} />
      ) : userProfile?.data?.avatarPreference?.companionType === "Female" ? (
        <FemaleAvatar />
      ) : (
        <MaleAvatar />
      )}
    </div>
  );
}

export default TherapySession;
