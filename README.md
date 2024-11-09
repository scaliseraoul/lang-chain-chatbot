# LangChain PDF Chat App

This application demonstrates the use of [LangChain](https://github.com/hwchase17/langchain) with persistent chat functionality and Retrieval-Augmented Generation (RAG) based on content from a local PDF file. The app loads the PDF, processes it with LangChain to enable question-answering, and provides a persistent chat experience for users. 

PDF downloaded from https://www.credem.it/content/dam/credem/documenti/Trasparenza/-conti-correnti---fascicoli-dei-servizi-accessori-al-conto/00001_010_FA_P_C_CFA21_P10831.pdf

## Features

- **PDF-Based Retrieval-Augmented Generation (RAG)**: Processes content from a PDF file, enabling the model to provide answers to user questions based on the document content.
- **Persistent Chat History**: Keeps track of user questions and responses to maintain context across interactions.
- **LangChain Integration**: Utilizes LangChain for handling document processing, retrieval, and embeddings to generate accurate responses based on the PDF content.

## TODO

- **Optimize Chain Creation**: Move the chain creation logic to a separate module, allowing initialization once and avoiding re-creation with every message.
- **Fix PDF URL for Vercel Deployment**: Update the PDF loader to handle file loading correctly on Vercel without direct filesystem access, possibly by fetching the PDF as an HTTP resource.
- **Write setup instruction**