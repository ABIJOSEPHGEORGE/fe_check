import io from 'socket.io-client';
let socket;

const connectSocket = () => {
  if (!socket || !socket.connected) {
    const token = localStorage.getItem('session');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    socket = io(process.env.REACT_APP_API_URL, {
      extraHeaders: headers,
    });
    socket.connect();
    socket.emit('join');
  }
};

const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
    console.log('=====socket disconnected=========');
  }
};

// Match events
const skipUser = (userId) => {
  socket.emit('skipUser', userId);
};

const connectUser = (connect_id) => {
  socket.emit('connectUser', connect_id);
};

//Message events
const newMessage = ({room_id, message}) => {
  socket.emit('newMessage', { room_id, message});
}

const getMessages = (room_id) => {
  socket.emit('getMessages', {room_id})
}

const updateOnlineStatus = () => {
  socket.emit('markAsOnline');
}

const getOnlineUsers = () => {
  socket.emit('getOnlineUsers');
}

const markMessageAsRead = (message_id) => {
  socket.emit('markAsRead', { message_id});
}

const updateEndUserBalance = (requested_user) => {
  socket.emit('updateEndUserCoin', {requested_user});
}

export { socket, connectSocket, disconnectSocket, skipUser, connectUser, newMessage, getMessages, updateOnlineStatus, getOnlineUsers, markMessageAsRead, updateEndUserBalance };
