# FRIENDZONE
This is a React application that allows users to view posts and profiles, as well as create accounts and log in. The application uses React Router to navigate between different pages, and it fetches data from a local API to display posts and user information.

# Technologies used
React
axios

# Components
The application has the following components:

# App.js
This is the main component of the application that contains the router and all the other components.

# ProfileSection.js
This component displays the user's profile information, such as their name, profile picture, and bio. It also allows the user to edit their profile information.

# PostsSection.js
This component displays all the posts from all users, as well as the ability to like and comment on posts. It also allows the user to filter posts by user.

# SignUp.js
This component allows the user to create a new account.

# Login.js
This component allows the user to log in to their account.

# NoPage.js
This component is displayed when a user navigates to a non-existent page.

# Footer.js
This component displays the footer of the application.

# Layout.js
This component contains the navigation bar and is used to wrap all the other components.

# App Features
User Authentication
When the app loads, the user is not logged in. To log in, click the "Login" button in the top right corner of the screen and enter your username and password. If you do not have an account, click the "Sign Up" button to create one.

# Posting Pictures
Once logged in, users can post pictures by clicking the "Add Post" button in the top right corner of the screen. They will be prompted to enter an image URL, which will be displayed in the app along with the date the picture was posted and the number of likes and comments.

# Liking Pictures
Users can like pictures by double-clicking on the picture. This will increase the number of likes and add the user's name to a list of users who have liked the picture. Users can only like a picture once.

# Following Users
Users can follow other users by clicking the "Follow" button on a picture. This will add the user to the list of followers for that user's profile. If the user is already following the profile, the "Following" button will be displayed instead.

# Leaving Comments
Users can leave comments on pictures by entering text into the comment input field below the picture and clicking the "Comment" button. This will add the user's name and comment to the list of comments for the picture. Comments are displayed below the picture along with the user's name and a timestamp.

# How the App Works
The app is built using React and axios, and uses JSON data stored on a remote server to display pictures, user information, and comments. The app is divided into several components, including:

App: the main component that handles user authentication and renders the other components
LoginForm: a component that displays a login form and handles user authentication
SignUpForm: a component that displays a sign up form and handles user creation
NavBar: a component that displays the navigation bar and handles user logout
PostsSection: a component that displays the pictures and handles user interactions, such as liking, following, and commenting on pictures
The app uses useState and useEffect hooks to manage state and update the UI based on user actions. axios is used to make HTTP requests to the remote server and update the JSON data stored there.

When a user logs in or signs up, their username and password are stored in the browser's local storage. When the app loads, it checks the local storage to see if a user is already logged in, and displays the appropriate UI based on the user's authentication status.

When a user posts a picture, the app sends an HTTP request to the remote server to add the picture to the JSON data. When a user likes a picture or leaves a comment, the app sends an HTTP request to the server to update the likes or comments for the picture.

When a user follows another user, the app sends an HTTP request to the server to update the list of followers for that user's profile. The app checks the list of followers to see if the user is already following the profile, and displays the appropriate UI based on the user's following status.


