import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { NextRequest, NextResponse } from "next/server";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0
});
const config = { configurable: { thread_id: 0 } };


const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await llm.invoke(state.messages);
  return { messages: response };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

// Define the POST handler for /api/chat
export async function POST(request: NextRequest) {
    try {
      // Parse the JSON body from the request
      const { question } = await request.json();

      if (!question) {
        return NextResponse.json({ error: "Missing question" }, { status: 400 });
      }

      const userInput = [
        {
          role: "user",
          content: question,
        },
      ];

      // Run the LangChain workflow with provided messages
      const response = await app.invoke({ messages: userInput },config);   
      const reply =  response.messages[response.messages.length - 1].content

      // Return the response as JSON
      return NextResponse.json({reply:reply}, { status: 200 });
    } catch (error) {
      console.error("Error in LangChain API:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }