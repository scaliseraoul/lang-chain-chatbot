import { ChatOpenAI } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";
import { processStaticPDF } from "@/lib/pdfProcessor";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";


let vectorStore: MemoryVectorStore;
let chatHistory: BaseMessage[] = [];

// Load the vector store once on the first request
async function getVectorStore() {
  if (!vectorStore) {
    vectorStore = await processStaticPDF();
  }
  return vectorStore;
}

const systemPrompt =
  "You are an assistant for question-answering tasks. " +
  "Use the following pieces of retrieved context to answer " +
  "the question. If you don't know the answer, say that you " +
  "don't know. Use three sentences maximum and keep the " +
  "answer concise." +
  "\n\n" +
  "{context}";

// Define the POST handler for /api/chat
export async function POST(request: NextRequest) {
    try {
      // Parse the JSON body from the request
      const { question } = await request.json();

      if (!question) {
        return NextResponse.json({ error: "Missing question" }, { status: 400 });
      }

      const vectorStore = await getVectorStore();
      const retriever = vectorStore.asRetriever();

      const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });

      const contextualizeQSystemPrompt =
      "Given a chat history and the latest user question " +
      "which might reference context in the chat history, " +
      "formulate a standalone question which can be understood " +
      "without the chat history. Do NOT answer the question, " +
      "just reformulate it if needed and otherwise return it as is.";

      const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
        ["system", contextualizeQSystemPrompt],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
      ]);

      const historyAwareRetriever = await createHistoryAwareRetriever({
        llm,
        retriever,
        rephrasePrompt: contextualizeQPrompt,
      });

      const qaPrompt = ChatPromptTemplate.fromMessages([
        ["system", systemPrompt],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
      ]);

      const questionAnswerChain = await createStuffDocumentsChain({
        llm,
        prompt: qaPrompt,
      });
      
      const ragChain = await createRetrievalChain({
        retriever: historyAwareRetriever,
        combineDocsChain: questionAnswerChain,
      });

      const aiMsg = await ragChain.invoke({
        input: question,
        chat_history: chatHistory,
      });

      chatHistory = chatHistory.concat([
        new HumanMessage(question),
        new AIMessage(aiMsg.answer),
      ]);

      // Return the response as JSON
      return NextResponse.json({reply:aiMsg.answer}, { status: 200 });
    } catch (error) {
      console.error("Error in LangChain API:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }