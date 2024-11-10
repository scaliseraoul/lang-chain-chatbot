import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function processStaticPDF() {

  let baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
  baseUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

  const pdfUrl = `${baseUrl}/ugly_bank_file.pdf`;
  const response = await fetch(pdfUrl);
  
  if (!response.ok) {
    throw new Error("Failed to fetch PDF file");
  }

  const pdfArrayBuffer = await response.arrayBuffer();
  const pdfBlob = new Blob([pdfArrayBuffer], { type: "application/pdf" });
  const loader = new WebPDFLoader(pdfBlob);
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splits = await textSplitter.splitDocuments(docs);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );

  return vectorStore;
}