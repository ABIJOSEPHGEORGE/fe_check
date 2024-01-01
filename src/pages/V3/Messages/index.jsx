import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import Dashboard from '../Dashboard';
import PreviewCard from './PreviewCard';
import emoji__vector from '../../../assets/icons/emoji.svg';
import { IoMdSend  } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import { shortlistedUsers } from '../../../apis/shortlisted';
import { getMessages, getOnlineUsers, newMessage, socket, markMessageAsRead } from '../../../socket/SocketManager';
import UserStore from '../../../contexts/UserStore';
import ConvertTime from './ConvertTime';
import { FaArrowDown } from "react-icons/fa6";
import { IoCheckmarkDone } from 'react-icons/io5';
import message_initial from '../../../assets/icons/message_initial.svg';
import { Avatar } from "@material-tailwind/react";
import message_back_btn from '../../../assets/icons/message_back_btn.svg';
import verified_badge from '../../../assets/icons/verified_badge.svg';

const Messages = () => {

    const { user } = useContext(UserStore);
    const [emoji, setEmoji] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [shortlisted, setShortlisted] = useState([]);
    const [activeRoomId, setActiveRoomId] = useState('');
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const [shouldScrollDown, setShouldScrollDown] = useState(true);
    const [activeUser, setActiveUser] = useState({});

    const messagesContainerRef = useRef(null);
    let currentMessageDate = null;

    const fetchShortlistedUsers = async () => {
        const  res = await shortlistedUsers();
        setShortlisted(res?.data[0]?.members ?? []);
    };

    const fetchActiveUserMessages = async (room_id = activeRoomId) => {
        getMessages(room_id);
        //find selected active user
        const user = shortlisted?.filter(user=>user?.roomId === room_id);
        setActiveUser(user[0]);
    };

    const handleSentMessage = () => {
        newMessage({ room_id: activeRoomId, message: inputMessage});
    };

    const handleScroll = () => {
      // Check if the user is at the bottom of the messages container
      const isAtBottom = messagesContainerRef.current.scrollHeight - messagesContainerRef.current.scrollTop === messagesContainerRef.current.clientHeight;
      setShouldScrollDown(isAtBottom);
  };

    const getOnlineUserMemoized = useCallback(getOnlineUsers,[socket]);

    useEffect(() => {
        fetchShortlistedUsers();
    },[]);

    useEffect(() => {
        fetchActiveUserMessages();
    },[activeRoomId]);

    useEffect(() => {

        getOnlineUserMemoized();

        socket.on('clientMessage', data => {
            if(data.success){
                setInputMessage('')
                fetchActiveUserMessages(data?.room_id);
            }
        });

        socket.on('clientOnlineStatus', data => {
          if(data.success){
            getOnlineUsers();
          }
        });

        socket.on('clientOnlineUsers', data => {
          if(data.success){
            setOnlineUsers(data?.online)
          }
        });

        socket.on('clientMessageRead', data => {
          if(data.success){
            setMessages(data?.messages);
          }
        })

    },[socket])

    

    useEffect(() => {
      //get user messages
      socket.on('roomMessages', data => {
        if(data.success){
          
            setMessages(data?.res || []);
            const receiver_messages = data?.res.filter(message => message?.receiver_id?.toString() === user?.id?.toString());
          
            const count = receiver_messages.filter((msg) => !msg?.read).length;
  
            setUnreadMessageCount(count);
        }
      });

    //Handling message read status
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && entry.intersectionRatio > 0.5){
          const messageId = entry.target.getAttribute('id').replace('message-', '');
          // Check if the message is not already marked as read
            const message = messages.find(msg => msg._id === messageId);
         
            if (message && !message.read && user.id.toString() !== message.sender_id.toString()) {
     
              markMessageAsRead(messageId);
              
              setUnreadMessageCount(prevCount => Math.max(prevCount - 1, 0));
            }
        }
      })
    }
      
      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      });

      messages
      .filter(message => !message.read) // Filter out the read messages
      .forEach(message => {
          const element = document.getElementById(`message-${message._id}`);
          if (element) {
              element.setAttribute('data-unread-message-id', message._id);
              observer.observe(element);
          }
      });

      if (messagesContainerRef.current) {
        messagesContainerRef.current.addEventListener('scroll', handleScroll);
      }

      return () => {
        observer.disconnect();
        if (messagesContainerRef.current) {
          messagesContainerRef.current.removeEventListener('scroll', handleScroll);
        }
    };
    },[socket, messages])


    const scrollToBottom = () => {
      if (shouldScrollDown && messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

        const getMessageCategory = (messageDate) => {
            const today = new Date();
            const messageDay = new Date(messageDate);

            if (messageDay.toDateString() === today.toDateString()) {
                return 'Today';
            }

            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            if (messageDay.toDateString() === yesterday.toDateString()) {
                return 'Yesterday';
            }

            return messageDay.toLocaleDateString('en-IN');
        };
       
        
    
        return (
            <Dashboard>
              <div className="flex items-start justify-start w-full min-h-[480px] h-full rounded-xl drop-shadow-lg shadow-gray-400">
                <div className={`w-full ${activeRoomId ? 'hidden xl:block': 'block'} lg:w-2/6 h-full min-h-full max-h-full overflow-y-scroll scrollbar-hide bg-white border-r-1 border-gray-300 rounded-xl lg:rounded-tl-xl lg:rounded-bl-xl lg:rounded-br-none lg:rounded-tr-none p-3`}>
                  {shortlisted?.map((usr, index) => (
                    <PreviewCard key={index} data={usr} setActiveRoomId={setActiveRoomId} lastMessage={messages[messages.length - 1]} onlineUsers={onlineUsers} currentUser={user?.id}/>
                  ))}
                </div>
                <div className={`w-full lg:w-5/6 ${!activeRoomId ? 'hidden lg:flex' : 'flex'} h-full flex-col justify-end bg-chatBg scrollbar-hide rounded-tr-xl rounded-xl lg:rounded-br-xl lg:rounded-bl-none lg:rounded-tl-none min-h-[680px] lg:min-h-max max-h-[680px] lg:max-h-[480px] relative`}>
                  {
                    !activeRoomId ?
                      <div className="w-full h-full flex justify-center items-center">
                        <img src={message_initial} className='w-3/4' alt="Please select a user to chat" />
                      </div>
                    :
                  <>
                  <div className="bg-white w-full h-16 absolute top-0 flex items-center justify-between px-4">
                      <div className="w-fit flex items-center gap-2">
                        <Avatar
                            size="md"
                            alt="avatar"
                            src={activeUser?.photo}
                            className="border  shadow-green-900/20 ring-4 ring-white"
                        />
                        <div className="flex flex-col gap-1">
                          <h3 className='text-md flex gap-1'>{activeUser?.name}<span>{activeUser?.verification?.status !== 'verified' && <img src={verified_badge} alt='verified'/>}</span></h3>
                          <div className="flex items-center gap-2">
                          <span className={`  w-3 h-3 bg-green-400 ${onlineUsers?.includes(activeUser?._id) ? 'bg-green-400': 'bg-red-400'} border-2 border-white dark:border-gray-800 rounded-full`}></span>
                          <p className='text-sm '>{onlineUsers?.includes(activeUser?._id)? 'Online' : 'Offline'}</p>
                          </div>
                        </div>
                      </div>
                      <img src={message_back_btn} alt="back button" className='w-8 h-8 cursor-pointer' onClick={()=>setActiveRoomId('')} />
                  </div>
                  <div className='absolute bottom-32 right-3 flex flex-col items-center justify-center gap-1'>
                    {unreadMessageCount > 0 && <span className=" inline-flex items-center justify-center px-2 py-1 text-md cursor-pointer font-bold leading-none text-white bg-green-400 rounded-full">{unreadMessageCount}</span>}
                    {!shouldScrollDown  && <span onClick={()=>{ messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight}} className=" inline-flex items-center justify-center px-2 py-2 text-md cursor-pointer font-bold leading-none text-white bg-gray-600 rounded-full"><FaArrowDown size={10} color='white'/></span>}
                  </div>
                  
                  <div ref={messagesContainerRef} className="w-full space-y-3 p-4 overflow-y-scroll">
                      {messages?.map((cnt, idx) => {
                        const category = getMessageCategory(cnt.createdAt);

                        // Render the date header if it's a new date
                        const showDateHeader = category !== currentMessageDate;

                        if (showDateHeader) {
                          currentMessageDate = category;
                        }

            

                      return (
                        <React.Fragment key={idx}>
                          {showDateHeader && (
                            <div key={`date-${idx}`} className="date-header flex justify-center">
                              <p className=' bg-white text-gray-700 rounded-full w-fit px-6 py-1'>{category}</p>
                            </div>
                          )}
                          <div className={`w-full flex gap-1 flex-col ${user?.id?.toString() === cnt?.sender_id?.toString() ? 'items-end' : 'items-start'}`}>
                            <p id={`message-${cnt._id}`} className='p-2 bg-gray-100 w-2/6 rounded-2xl text-gray-800'>{cnt?.message}</p>
                            <div className="flex justify-end gap-1 items-center">
                              {cnt?.sender_id?.toString() === user?.id?.toString() && <IoCheckmarkDone size={15} className={`${cnt?.read ? 'text-light-blue-600' : 'text-gray-500'}`}/>}
                              <p className='text-xs text-gray-600'>{ConvertTime(cnt?.createdAt)}</p>
                            </div>
                            
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                  {
                    activeRoomId &&
                    <div className="bg-white w-full h-14 border-l-2 border-gray-300 flex justify-between items-center p-2 rounded-br-xl gap-3 relative">
                      {emoji && (
                        <div className="absolute bottom-16">
                          <EmojiPicker height={400} onEmojiClick={(data) => setInputMessage((prev) => prev + data?.emoji)} />
                        </div>
                      )}
                      <img src={emoji__vector} alt="select emoji" className=' w-6 h-6 cursor-pointer' onClick={() => setEmoji(!emoji)} />
                      <input type='text' value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} className='w-full rounded-full bg-gray-200 text-gray-700 px-4 py-2 focus:outline-none' placeholder="Type a message" />
                      <IoMdSend size={30} className="text-brandRed cursor-pointer" onClick={handleSentMessage} />
                    </div>
                  }
                  </>
                }
                </div>
              </div>
            </Dashboard>
          );
};

export default Messages;