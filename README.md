# Reddit Meme Extractor Frontend

A frontend web application built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **React Toastify**, designed to display and interact with memes fetched from Reddit. This frontend connects to a backend API that handles data retrieval, storage, and processing.


## Tech Stack

| Tool / Library      | Version     |
|--------------------|-------------|
| Next.js             | 15.3.x      |
| React               | 19.x        |
| Tailwind CSS        | 4.x         |
| Axios               | 1.9.x       |
| React Toastify      | 11.x        |
| Serverless Framework| 3.40.x      |
| Node.js             | 22.x        |

---

## Features

- Displays top memes from a configured subreddit (retrieved from backend API)
- Supports date-based filtering of memes
- Toast notifications for success/error feedback
- Responsive UI powered by Tailwind CSS
- Serverless simulation via `serverless-offline`

## Getting Started

### Prerequisites

- **Node.js** version **22.x** (or higher)

Check if Node.js is installed:

```bash
node -v
```

If you see a version lower than `v22.0.0` or **command not found**, install Node.js 22.x from [https://nodejs.org/en/download/](https://nodejs.org/en/download/) or using a version manager like `nvm`:

```bash
nvm install 22
nvm use 22
```

---

### 1. Clone the repository

```bash
git clone https://github.com/jfaylon/reddit-meme-extractor-frontend.git
cd reddit-meme-extractor-frontend
```

### 📥 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

The frontend expects a backend API accessible via an environment variable.

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000
```

Replace `http://localhost:8000` with your actual backend API URL.

OR

Copy the .env.example file to become .env

```bash
cp .env.example .env
```

---


### 🏃‍♂️ 4a. Run the development server

```bash
npm run dev
```

OR

### 🏃‍♂️ 4b. Run the development server via serverless-offline

```bash
npm run offline
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

While this is a frontend app, it is compatible with serverless deployment using the Serverless Framework upon configuration. You can deploy it together with a backend service or independently to platforms like Vercel or AWS Lambda@Edge.

---

## Future Enhancements

- Support for multiple subreddits
- Dark mode toggle
- Infinite scroll
- Sorting posts by rank or score