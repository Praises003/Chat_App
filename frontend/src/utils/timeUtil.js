// function formatMessageTimestamp(createdAt) {
//     const currentDate = new Date();
//     const messageDate = new Date(createdAt);
  
//     const timeDifferenceInSeconds = Math.floor((currentDate - messageDate) / 1000);
//     const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
//     const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
//     const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  
//     if (timeDifferenceInDays === 0) {
//       if (timeDifferenceInHours === 0) {
//         if (timeDifferenceInMinutes < 1) {
//           const hours = currentDate.getHours();
//           const minutes = currentDate.getMinutes();
//           return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
//         }
//         return `${timeDifferenceInMinutes} min${timeDifferenceInMinutes > 1 ? 's' : ''} ago`;
//       }
//       return `${timeDifferenceInHours} hr${timeDifferenceInHours > 1 ? 's' : ''} ago`;
//     } else if (timeDifferenceInDays === 1) {
//       return "Yesterday";
//     } else {
//       const options = { hour: 'numeric', minute: 'numeric' };
//       return messageDate.toLocaleTimeString(undefined, options);
//     }
//   }
// function formatMessageTimestamp(createdAt) {
//     const currentDate = new Date();
//     const messageDate = new Date(createdAt);
  
//     const timeDifferenceInSeconds = Math.floor((currentDate - messageDate) / 1000);
//     const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
//     const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
//     const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  
//     if (timeDifferenceInHours < 1) {
//       const hours = currentDate.getHours();
//       const minutes = currentDate.getMinutes();
//       return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
//     } else if (timeDifferenceInDays === 0) {
//       const hours = messageDate.getHours();
//       const minutes = messageDate.getMinutes();
//       return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
//     } else if (timeDifferenceInDays === 1) {
//       return "Yesterday";
//     } else {
//       const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
//       return messageDate.toLocaleDateString(undefined, options);
//     }
//   }
function formatMessageTimestamp(createdAt) {
    const currentDate = new Date();
    const messageDate = new Date(createdAt);
  
    const timeDifferenceInSeconds = Math.floor((currentDate - messageDate) / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  
    if (timeDifferenceInHours < 1) {
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } else if (timeDifferenceInDays === 0) {
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } else if (timeDifferenceInDays === 1) {
      return "Yesterday";
    } else if (timeDifferenceInDays < 2) {
      return "Yesterday";
    } else {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return messageDate.toLocaleDateString(undefined, options);
    }
  }
  
  
  export default formatMessageTimestamp
  // Example usage:
  //const createdAt = "2023-08-29T10:00:00Z"; // Replace with your message's created date
  //const formattedTimestamp = formatMessageTimestamp(createdAt);
  //console.log(formattedTimestamp); // Example output: "9:19" or "Yesterday" or "29/08/2023"
  //In this modified function, when the message was created "j