[![MindsDB](https://img.shields.io/badge/MINDSDB-00A550?labelColor=16202D&style=for-the-badge&link=https://mindsdb.com/)](https://mindsdb.com/)
[![Quira.sh](https://img.shields.io/badge/Quine.sh-131633?style=for-the-badge&link=https://quira.sh/)](https://quira.sh/)

# HeyMate

![GitHub repo size](https://img.shields.io/github/repo-size/RohittCodes/heymate?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/RohittCodes/heymate?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/RohittCodes/heymate?style=for-the-badge)

HeyMate is an AI-powered messaging application that allows users to chat with their friends and family. A place to hangout and have fun with your friends. HeyMate is built using MindsDB to provide AI-powered responses to the users through various chatbots and models.

## Table of Contents

- [HeyMate 👋](#heymate)
  - [Table of Contents 📑](#table-of-contents)
  - [Demo 🚀](#demo-)
  - [Features 🎉](#features-)
  - [Tech Stack 🛠️](#tech-stack-️)
  - [Installation and Usage 📚](#installation-and-usage-)
    - [Setup](#setup)
    - [Running the Application](#running-the-application)
    - [MindsDB Setup](#mindsdb-setup)
  - [Contributing 🤝](#contributing-)
  - [License 🤖](#license-)

## Demo 🚀

[![HeyMate](https://img.shields.io/badge/HeyMate-131633?style=for-the-badge&link=https://heymate.vercel.app/)](https://heymate.vercel.app/)

** Note: The demo is not yet available. **

## Features 🎉

- **Authentication**: Secure Authentication and Authorization using Auth.js
- **Core Features**: Chat with Friends and Family you care about. No limits on the number of friends you can chat with.
  - **Direct Messaging**: Chat with your friends and family in real-time.
  - **Group Messaging**: Create groups and chat with multiple friends at once.
  - **Invite Friends**: Invite your friends to join HeyMate and chat with them.
- **AI-Powered Chatbots**: Want to have fun or need help with something? Use the MindsDB powered chatbots to get the help you need. The chatbots available are:
  - **Cleverbot**: Chat with Cleverbot, the ai bot with the best knowledge around the world.
  - **DankMeme**: Ai bot to provide you with the best memes you can find on the internet.
  - **CodeChimp**: Ai bot to help you with your coding problems.
  - **HugoBot**: Most human-like ai bot to chat with.
  - **AstraBot**: Ai bot to help you with your astronomy questions.
- **Sentiment Analysis**: Get the sentiment of the messages you send and receive.

## Tech Stack 🛠️

- **Frontend**: React.js, Next.js, Tailwind CSS, Shadcn UI
- **Database**: MySQL, MindsDB
- **Authentication**: Auth.js
- **Core packages**: pusher-js, uploadthing, resend

## Installation and Usage 📚

1. Clone the repository
```bash
git clone https://github.com/RohittCodes/heymate.git
```

2. Change the directory
```bash
cd heymate
```

3. Install the dependencies
```bash
npm install
```

4. Install Docker Desktop or Docker Engine and follow the instructions to setup MindsDB from the [self host page](https://docs.mindsdb.com/setup/self-hosted/docker)

### Setup

1. Create a `.env` file in the root directory of the project and add the following environment variables
```env
DATABASE_URL="mysql://root:password@localhost:3306/heymate?=public"
AUTH_SECRET="your-auth-secret-key"

UPLOADTHING_SECRET="your-uploadthing-secret-key"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="onboarding@resend.dev"

NEXT_PUBLIC_URL="http://localhost:3000"

NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-app-key"
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_SECRET="your-pusher-secret-key
PUSHER_CLUSTER="your-pusher-cluster"

MINDSDB_HOST="http://localhost:47334"
```

### MindsDB Setup

1. Run the MindsDB Docker container by following the instructions from the [self host page](https://docs.mindsdb.com/setup/self-hosted/docker)
2. Create a MindsDB account and get the API key from the MindsDB dashboard
3. Set up the MindsDB engine using minds_endpoint
```sql
CREATE ML_ENGINE minds_endpoint_engine
FROM minds_endpoint
USING
      minds_endpoint_api_key = 'api-key-value';
```
4. Create a model using the MindsDB engine
```sql
CREATE MODEL model_name --replace model_name with the model you would like to create
PREDICT answer
USING
      engine = 'minds_endpoint_engine',
      model_name = 'model-name',  --replace model-name with the model you would like to use
      prompt_template = 'prompt-to-the-model'  --replace prompt-to-the-model with the prompt_template you would like to use
```

5. Query the model to test it in MindsDB editor
```sql
SELECT text, answer
FROM minds_endpoint_model
WHERE text = 'I love machine learning!';
```

Example bot that we've created using MindsDB
```sql
CREATE MODEL dankmeme
PREDICT answer
USING
      engine = 'minds_endpoint_engine',
      model_name = 'dankmeme',
      prompt_template = 'act like dankmeme, an ai bot that provides you with the best memes you can find on the internet and provide a response to the following text: {{text}}';
```

### Running the Application

1. Run the development server
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. You can start chatting with your friends and family and use the AI-powered chatbots to have fun.

## Contributing 🤝

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any ideas or suggestions. You can also reach out to me on [Twitter](https://twitter.com/RohittCodes) if you have any questions or feedback.

## Contributors ✨

- [RohittCodes](https://github.com/rohittcodes)