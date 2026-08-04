# ============================================================
# 🌾 AgriGenAI RAG System
# Retriever
# ============================================================

from langchain_chroma import Chroma

from rag.config import (
    VECTOR_DB_PATH,
    TOP_K_RESULTS
)

from rag.processing.embedding_model import EmbeddingModel


# ============================================================
# Retriever Class
# ============================================================

class Retriever:

    def __init__(self):

        print("\n====================================")
        print("🔍 Loading Retriever...")
        print("====================================")

        self.embedding_model = EmbeddingModel().get_model()

        self.vector_db = Chroma(
            persist_directory=VECTOR_DB_PATH,
            embedding_function=self.embedding_model
        )

        print("✅ Retriever Ready\n")

    # ========================================================
    # Retrieve Relevant Documents
    # ========================================================

    def retrieve(self, query, top_k=TOP_K_RESULTS):

        print(f"\n🔍 Searching for: {query}")

        results = self.vector_db.similarity_search_with_score(
            query=query,
            k=top_k
        )

        relevant_documents = []

        print("\n====================================")
        print("📊 Similarity Scores")
        print("====================================")

        for index, (document, score) in enumerate(results, start=1):

            print(f"Document {index} -> Score: {score:.4f}")

            # Lower score = Better match
            if score <= 1.2:
                relevant_documents.append(document)

        print(f"\n✅ Relevant Documents Found: {len(relevant_documents)}")

        return relevant_documents

    # ========================================================
    # Retrieve With Scores
    # ========================================================

    def retrieve_with_score(self, query, top_k=TOP_K_RESULTS):

        return self.vector_db.similarity_search_with_score(
            query=query,
            k=top_k
        )

    # ========================================================
    # Show Results
    # ========================================================

    def show_results(self, results):

        print("\n====================================")
        print("📄 Retrieved Documents")
        print("====================================")

        if not results:
            print("❌ No relevant documents found.")
            return

        for index, doc in enumerate(results, start=1):

            print(f"\nDocument {index}")
            print("-" * 50)

            print(doc.page_content[:500])

            print("\nSource:")
            print(doc.metadata)

            print("-" * 50)


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    retriever = Retriever()

    while True:

        query = input("\nAsk Question (type 'exit' to quit): ")

        if query.lower() == "exit":
            break

        documents = retriever.retrieve(query)

        retriever.show_results(documents)