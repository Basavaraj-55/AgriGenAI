# ============================================================
# 🌾 AgriGenAI RAG System
# Search Engine
# ============================================================

from rag.retrieval.retriever import Retriever
from rag.retrieval.reranker import Reranker


# ============================================================
# Search Engine
# ============================================================

class SearchEngine:

    def __init__(self):

        print("\n====================================")
        print("🔍 Initializing Search Engine...")
        print("====================================")

        self.retriever = Retriever()
        self.reranker = Reranker()

        print("✅ Search Engine Ready\n")

    # ========================================================
    # Search Documents
    # ========================================================

    def search(
        self,
        query,
        retrieve_top_k=10,
        rerank_top_k=5
    ):

        # ------------------------------------
        # Retrieve Documents
        # ------------------------------------

        retrieved_documents = self.retriever.retrieve(
            query=query,
            top_k=retrieve_top_k
        )

        if not retrieved_documents:

            print("❌ No relevant documents retrieved.")

            return []

        # ------------------------------------
        # Rerank Documents
        # ------------------------------------

        ranked_documents = self.reranker.rerank(
            query=query,
            documents=retrieved_documents,
            top_k=rerank_top_k
        )

        print(f"✅ Final Documents After Reranking: {len(ranked_documents)}")

        return ranked_documents

    # ========================================================
    # Build Context
    # ========================================================

    def build_context(
        self,
        documents
    ):

        if not documents:
            return ""

        context_parts = []

        for index, document in enumerate(documents, start=1):

            context_parts.append(
                f"""
Document {index}
----------------------------------------
{document.page_content}
"""
            )

        return "\n".join(context_parts)

    # ========================================================
    # Search + Context
    # ========================================================

    def search_context(
        self,
        query
    ):

        documents = self.search(query)

        context = self.build_context(documents)

        return {

            "documents": documents,

            "context": context

        }


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    engine = SearchEngine()

    while True:

        print("\n====================================")
        print("🌾 AgriGenAI RAG Search")
        print("====================================")

        question = input("\nAsk Question : ")

        if question.lower() == "exit":
            break

        result = engine.search_context(question)

        print("\n====================================")
        print("📄 Retrieved Context")
        print("====================================")

        if result["context"]:
            print(result["context"][:2000])
        else:
            print("❌ No relevant context found.")

        print("\n====================================")
        print(f"📄 Documents Used: {len(result['documents'])}")
        print("====================================")