# Channel Subscriptions with Firebase Chat Rooms

This project allows users to subscribe to channels, join chat rooms, and send/receive messages in real-time. The application uses Firebase Firestore for channel and subscription management and Firebase Realtime Database for storing chat room messages. It provides a basic interface where users can:

- Add new channels
- Subscribe and unsubscribe from channels
- Join chat rooms for channels they are subscribed to
- Send and receive real-time messages in each channel's chat room

## Features

- **Channel Management**: Users can add new channels, view a list of available channels, and subscribe to channels.
- **Subscription Management**: Users can subscribe to or unsubscribe from channels, with their subscriptions stored in Firestore.
- **Chat Rooms**: For each channel, a unique chat room is created in Firebase Realtime Database. Users can join these rooms and interact in real-time.
- **Real-Time Messaging**: Messages sent in a chat room are updated immediately for all users in that room without needing to refresh the page.
- **Basic Chat Interface**: The interface allows users to post messages and view others' posts in real-time.

## Project Setup

### 1. Clone the repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/yourusername/channel-subscriptions-chat.git
cd channel-subscriptions-chat
```

### 2. Firebase Setup

Before running the application, you need to set up Firebase:

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable **Firestore** and **Realtime Database** for your project.
- Set up **Firebase Authentication** to allow user login (email/password or any other method of your choice).
- Create a new web app in Firebase Console, and copy your Firebase configuration.

### 3. Add Firebase Configuration

Replace the Firebase configuration in the `*.html` file with your Firebase project's configuration. You can find this configuration in your Firebase Console.

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 4. Running the Application

To run the application, you can simply open the `login.html` file in your browser. Since this is a client-side application, it will connect to Firebase and work directly from the browser.

```bash
open login.html
```

Run the django server:

```bash
python manage.py runserver
```

## Usage

### 1. **Adding Channels**

To add a new channel, type the channel name in the input field and click the "Add Channel" button. The channel will be added to Firestore, and it will appear in the list of available channels.

### 2. **Subscribing to Channels**

Once the channels are listed, you can subscribe to any of them by clicking the "Subscribe" button next to the channel name. Your subscription will be saved in Firestore under your user ID.

### 3. **Joining Chat Rooms**

For each channel, if you are subscribed, a "Join" button will appear. Clicking this button will take you to the chat room for that channel. You will be able to see all the messages and post new messages in real-time.

### 4. **Sending Messages**

In the chat room, you can type your messages in the input field and click the "Send" button. The message will be posted to the Firebase Realtime Database, and it will instantly appear in the chat for all other users who are currently in that room.

### 5. **Unsubscribing from Channels**

If you want to unsubscribe from a channel, click the "Unsubscribe" button in the "Your Subscriptions" section. This will remove the channel from your list of subscriptions in Firestore.

### 6. **Removing Channels**

If you are an admin or have the necessary permissions, you can click the "Remove" button next to any channel to delete the channel from Firestore. This will also remove the channel from the subscriptions of all users.

## Technologies Used

- **Firebase Firestore**: Used for storing channels and user subscriptions.
- **Firebase Realtime Database**: Used for storing and managing messages in real-time chat rooms.
- **Firebase Authentication**: Handles user login and authentication.
- **HTML/JavaScript**: The frontend of the application is built with basic HTML, and JavaScript.
- **Python/Django**: Used for the backend
