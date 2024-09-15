import formatMessage from "../utils/messages.js"; // Ensure this path is correct for your project
import { getFirestore } from "./firestore.js";  // Import the getFirestore function

const botName = "Africare Bot";

// Function to handle socket connections
export function socketConnection(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Get Firestore instance
    const db = getFirestore(); // Use getFirestore to get the Firestore instance

    socket.emit("message", formatMessage(botName, "Welcome to Africare Community Support!"));

    // Handle chat messages
    socket.on("chatMessage", async (msg) => {
      const message = {
        sender: msg.sender,
        text: msg.text,
        timestamp: new Date().toISOString(),
        likes: 0
      };

      try {
        const messageRef = await db.collection("messages").add(message);
        io.emit("message", {
          id: messageRef.id,
          ...message,
        });
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Handle message likes
    socket.on("likeMessage", async (messageId) => {
      const messageRef = db.collection("messages").doc(messageId);
      
      try {
        const messageSnapshot = await messageRef.get();
        if (messageSnapshot.exists) {
          const currentLikes = messageSnapshot.data().likes || 0;
          await messageRef.update({
            likes: currentLikes + 1,
          });
          io.emit("messageLiked", { id: messageId, likes: currentLikes + 1 });
        }
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    });

    // Handle typing events
    socket.on("typing", (user) => {
      socket.broadcast.emit("userTyping", user);
    });

    socket.on("stopTyping", (user) => {
      socket.broadcast.emit("userStopTyping", user);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}
