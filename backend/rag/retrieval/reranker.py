# ============================================================
# 🌾 AgriGenAI RAG System
# Reranker
# ============================================================

from sentence_transformers import CrossEncoder


# ============================================================
# Reranker Class
# ============================================================

class Reranker:

    def __init__(self):

        print("\n====================================")
        print("🧠 Loading Cross Encoder...")
        print("====================================")

        self.model = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

        print("✅ Cross Encoder Loaded\n")

    # ========================================================
    # Rerank Documents
    # ========================================================

    def rerank(
        self,
        query,
        documents,
        top_k=5
    ):

        if not documents:
            return []

        print("\n====================================")
        print("🧠 Reranking Documents...")
        print("====================================")

        pairs = [
            (query, doc.page_content)
            for doc in documents
        ]

        scores = self.model.predict(pairs)

        ranked = sorted(
            zip(scores, documents),
            key=lambda x: x[0],
            reverse=True
        )

        print("\n====================================")
        print("📊 Cross Encoder Scores")
        print("====================================")

        for i, (score, _) in enumerate(ranked, start=1):
            print(f"Document {i}: {score:.4f}")

        ranked_documents = [
            doc
            for score, doc in ranked[:top_k]
        ]

        print(f"\n✅ Selected Top {len(ranked_documents)} Documents")

        return ranked_documents


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    from rag.retrieval.retriever import Retriever

    retriever = Retriever()

    reranker = Reranker()

    while True:

        question = input("\nAsk Question (type 'exit' to quit): ")

        if question.lower() == "exit":
            break

        retrieved_docs = retriever.retrieve(
            question,
            top_k=10
        )

        ranked_docs = reranker.rerank(
            question,
            retrieved_docs,
            top_k=5
        )

        print("\n====================================")
        print("🏆 Top Ranked Documents")
        print("====================================")

        if not ranked_docs:
            print("❌ No relevant documents found.")
            continue

        for i, doc in enumerate(ranked_docs, start=1):

            print(f"\nResult {i}")
            print("--------------------------------")

            print(doc.page_content[:400])

            print("\nMetadata:")
            print(doc.metadata)