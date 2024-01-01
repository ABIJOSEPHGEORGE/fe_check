const ConvertTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
  };

export default ConvertTime;