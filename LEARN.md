# Hello eager learner👋
Let's deep dive into KOmegle

## What is Komegle?
Komegle is a free online chat website that allows you to chat with strangers. The concept is similar to Omegle.

**Built with curiosity🤔 using Node.js and Socket.io**

# How does it work?

## Eagle eye view🦅
1. **UserMe** hops into chat
2. He gets added into a room
3. Waits for other users to join
4. When **UserYou** joins, **UserMe** gets a notification
5. **UserYou** joins into **UserMe**'s room
6. In that room they can interact with each other

## Snake eye view🐍
1. **UserMe** hops into chat
2. He gets added to a Socket.IO room. Socket.IO room is assigned to him based on his socket ID.
![useradd](https://user-images.githubusercontent.com/70953546/228624797-f6f66d18-62fd-4b65-89fb-b06c652948d0.png)

In KOmege, Socket.IO room is just an array. When a room has no people, **UserMe**'s ID is room ID and put into the array.  

3. When **UserYou** joins, **UserMe** gets a notification. **UserYou** gets added to the same room as **UserMe** with the room ID of **UserMe**'s socket ID.
4. When **UserYou** joins, Socket.IO emits a message to the room he's in. This way **UserMe** gets a notification.
![image](https://user-images.githubusercontent.com/70953546/228625247-ea2c7622-8b43-4ddd-bcd2-8bc164f956c7.png)
  
  

5. **UserMe** and **UserYou** can interact with each other in the same room. Whenever someone sends message, it gets emitted to the room and everyone in the room gets the message.
6. When **UserHe** hops into chat, *users.js* goes through the array.  
    - If an array has two elements:
        - He skips the array and searches for another array.
    - If an array has one element:
        - He adds **UserHe**'s socket ID to the array and assigns the array as **UserHe**'s room ID.
    - If he can't find any array with one element:
        - He creates a new array with **UserHe**'s socket ID and assigns the array as **UserHe**'s room ID. Thus creating new room and adding **UserHe** to it.
7. When someone leaves the room, Socket.IO emits a message to the room he's in. This way **UserWhoever** is in room gets a notification.
