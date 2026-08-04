# ============================================================
# 🌾 AgriGenAI RAG System
# Vector Store (ChromaDB)
# ============================================================

import os

from langchain_chroma import Chroma

from rag.config import (
    VECTOR_DB_PATH
)

from rag.processing.embedding_model import (
    EmbeddingModel
)


# ============================================================
# Vector Store Class
# ============================================================

class VectorStore:

    def __init__(self):

        print("\n====================================")
        print("🗄 Initializing ChromaDB...")
        print("====================================")

        self.embedding_model = EmbeddingModel().get_model()

    # ========================================================
    # Create Vector Database
    # ========================================================

    def create_vector_store(self, chunks):

        print("\nCreating Vector Database...")

        vectordb = Chroma.from_documents(

            documents=chunks,

            embedding=self.embedding_model,

            persist_directory=VECTOR_DB_PATH

        )

        print("✅ Vector Database Created Successfully")

        return vectordb

    # ========================================================
    # Load Existing Database
    # ========================================================

    def load_vector_store(self):

        if not os.path.exists(VECTOR_DB_PATH):

            raise Exception(
                "Vector Database not found."
            )

        vectordb = Chroma(

            persist_directory=VECTOR_DB_PATH,

            embedding_function=self.embedding_model

        )

        print("✅ Vector Database Loaded")

        return vectordb

    # ========================================================
    # Similarity Search
    # ========================================================

    def search(

        self,

        query,

        k=5

    ):

        vectordb = self.load_vector_store()

        results = vectordb.similarity_search(

            query,

            k=k

        )

        return results


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    from rag.loaders.document_loader import DocumentLoader

    from rag.processing.text_splitter import TextSplitter

    from rag.config import DOCUMENTS_PATH

    print("\n====================================")
    print("🌾 AgriGenAI Vector Store Test")
    print("====================================")

    # ----------------------------
    # Load Documents
    # ----------------------------

    loader = DocumentLoader(

        DOCUMENTS_PATH

    )

    documents = loader.load_documents()

    # ----------------------------
    # Split Documents
    # ----------------------------

    splitter = TextSplitter()

    chunks = splitter.split_documents(

        documents

    )

    # ----------------------------
    # Create Vector Store
    # ----------------------------

    vector_store = VectorStore()

    db = vector_store.create_vector_store(

        chunks

    )

    print("\n====================================")
    print("✅ ChromaDB Ready")
    print("====================================")