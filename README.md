# Mystery Message

Mystery Message is a Next.js project that allows users to receive anonymous messages through a unique sharable link. Users can register, verify their email, and then share their personal message board with others.

## Features

- **User Registration**: Users sign up by entering a unique username, email, and password.
- **Email Verification**: After signing up, users receive a verification code via email to confirm their account.
- **User Dashboard**: Once logged in, users get a unique shareable link: `http://localhost:3030/u/[username]`.
- **Receiving Messages**: Anyone, even non-registered users, can send messages anonymously through the unique user link.
- **AI-Generated Suggested Messages**: Clicking the 'Suggest Messages' button generates three AI-powered random messages. Users can click one to select and send it easily.
- **Message Management**: Users can refresh their dashboard to see new messages sent to them.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/pulkit-1110/mystery-message
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file using the provided `.env.sample`.

## Environment Variables

Create a `.env` file in the root directory and set up the following variables:

```sh
MONGODB_URI=''
EMAIL_USERNAME=''
EMAIL_PASSWORD=''
NEXTAUTH_SECRET=''
OPENAI_API_KEY=''
```

## Running the Project

Start the development server:

```sh
npm run dev
```

The app will be available at `http://localhost:3030/`.

## License

This project is open-source and available under the [MIT License](https://github.com/pulkit-1110/mystery-message?tab=MIT-1-ov-file#readme).
