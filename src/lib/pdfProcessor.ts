import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function processStaticPDF() {
    
  const pdfUrl = process.env.TEST_PDF_URL || "https://www.credem.it/content/dam/credem/documenti/Trasparenza/-conti-correnti---fascicoli-dei-servizi-accessori-al-conto/00001_010_FA_P_C_CFA21_P10831.pdf"
  
  console.log(pdfUrl)

  const response = await fetch(pdfUrl);

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