# ============================================================
# 🌾 AgriGenAI RAG Pipeline
# ============================================================

import os

from rag.config import (
    DOCUMENTS_PATH,
    VECTOR_DB_PATH
)

from rag.loaders.document_loader import DocumentLoader
from rag.processing.text_splitter import TextSplitter
from rag.processing.vector_store import VectorStore
from rag.retrieval.search import SearchEngine

from utils.gemini import ask_gemini


# ============================================================
# RAG Pipeline
# ============================================================

class RAGPipeline:

    def __init__(self):

        print("\n====================================")
        print("🌾 Initializing AgriGenAI RAG")
        print("====================================")

        self.loader = DocumentLoader(DOCUMENTS_PATH)
        self.splitter = TextSplitter()
        self.vector_store = VectorStore()
        self.search_engine = SearchEngine()

        print("✅ RAG Pipeline Ready")

    # ========================================================
    # Build Knowledge Base
    # ========================================================

    def build_knowledge_base(self):

        print("\n====================================")
        print("📄 Loading Documents...")
        print("====================================")

        documents = self.loader.load_documents()

        if not documents:
            raise Exception("❌ No documents found.")

        print("\n====================================")
        print("✂ Splitting Documents...")
        print("====================================")

        chunks = self.splitter.split_documents(documents)

        print("\n====================================")
        print("🧠 Creating Vector Database...")
        print("====================================")

        self.vector_store.create_vector_store(chunks)

        print("\n====================================")
        print("✅ Knowledge Base Created Successfully")
        print("====================================")

    # ========================================================
    # Ask Question
    # ========================================================

    def ask(self, question):

        print("\n====================================")
        print("🔍 Searching Documents...")
        print("====================================")

        result = self.search_engine.search_context(question)

        documents = result["documents"]
        context = result["context"]

        print("\n====================================")
        print("📄 Search Result")
        print("====================================")

        print(f"Documents Retrieved : {len(documents)}")

        # ====================================================
        # RAG MODE
        # ====================================================

        if context and context.strip():

            print("✅ Using Agriculture Knowledge Base")

            print("\n====================================")
            print("📄 Context Preview")
            print("====================================")

            print(context[:3000])

            answer = ask_gemini(
                question=question,
                context=context
            )

        # ====================================================
        # GEMINI FALLBACK
        # ====================================================

        else:

            print("⚠ No relevant documents found.")
            print("🤖 Switching to Gemini General Knowledge")

            answer = ask_gemini(
                question=question
            )

        # ====================================================
        # Response
        # ====================================================

        return {

            "question": question,

            "answer": answer,

            "context": context,

            "documents": len(documents)

        }


# ============================================================
# Main
# ============================================================

if __name__ == "__main__":

    rag = RAGPipeline()

    if (
        not os.path.exists(VECTOR_DB_PATH)
        or
        len(os.listdir(VECTOR_DB_PATH)) == 0
    ):

        print("\n📚 Creating Knowledge Base...\n")

        rag.build_knowledge_base()

    else:

        print("\n✅ Existing Knowledge Base Found")

    print("\n====================================")
    print("🌾 AgriGenAI Chat")
    print("====================================")

    while True:

        question = input("\nAsk : ")

        if question.lower() in ["exit", "quit"]:

            print("\n👋 Exiting AgriGenAI...")
            break

        result = rag.ask(question)

        print("\n====================================")
        print("🤖 Answer")
        print("====================================\n")

        print(result["answer"])

        print("\n====================================")
        print("📄 Documents Used")
        print("====================================")

        print(result["documents"])