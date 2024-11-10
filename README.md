# LangChain PDF Chat App

Live demo: https://lang-chain-chatbot.vercel.app/chat

This application demonstrates the use of [LangChain](https://github.com/hwchase17/langchain) with persistent chat functionality and Retrieval-Augmented Generation (RAG) based on content from a local PDF file. The app loads the PDF, processes it with LangChain to enable question-answering, and provides a persistent chat experience for users. 

PDF downloaded from https://www.credem.it/content/dam/credem/documenti/Trasparenza/-conti-correnti---fascicoli-dei-servizi-accessori-al-conto/00001_010_FA_P_C_CFA21_P10831.pdf

## Features

- **PDF-Based Retrieval-Augmented Generation (RAG)**: Processes content from a PDF file, enabling the model to provide answers to user questions based on the document content.
- **Persistent Chat History**: Keeps track of user questions and responses to maintain context across interactions.
- **LangChain Integration**: Utilizes LangChain for handling document processing, retrieval, and embeddings to generate accurate responses based on the PDF content.

# Setup Instructions

## Prerequisites

3. **OpenAI API Key**: Get an OpenAI API key if you haven’t already. You’ll need this for LangChain embeddings.

## 1. Clone the Repository

```bash
git clone <https://github.com/scaliseraoul/lang-chain-chatbot>
cd <lang-chain-chatbot>
```

## 2. Install Dependencies

Install the required packages by running:

```bash
npm install
```

## 3. Set Up Environment Variables

Create a `.env` or copy `.env.exemple`

```plaintext
# OpenAI API key for LangChain
OPENAI_API_KEY=your_openai_api_key

# URL for the PDF document
TEST_PDF_URL=https://www.credem.it/content/dam/credem/documenti/Trasparenza/-conti-correnti---fascicoli-dei-servizi-accessori-al-conto/00001_010_FA_P_C_CFA21_P10831.pdf
```

Replace `your_openai_api_key` with your actual OpenAI API key.


## 4. Run the Application Locally

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to test the application.

## 5. Test the Chat Functionality

1. Type a question into the input field about the "Servizi accessori al Conto Credem Facile" and click "Ask".
2. The app should fetch relevant information from the PDF and respond accordingly.