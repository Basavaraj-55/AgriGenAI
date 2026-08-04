# ============================================================
# 🌾 AgriGenAI RAG System
# Combined Document Loader
# ============================================================

import os

from rag.loaders.pdf_loader import PDFLoader
from rag.loaders.text_loader import TextLoader


# ============================================================
# Document Loader Class
# ============================================================

class DocumentLoader:

    def __init__(self, documents_folder):

        self.documents_folder = documents_folder

        self.pdf_loader = PDFLoader(
            documents_folder
        )

        self.text_loader = TextLoader(
            documents_folder
        )

    # ========================================================
    # Load All Documents
    # ========================================================

    def load_documents(self):

        print("\n====================================")
        print("🌾 AgriGenAI RAG")
        print("Loading Documents...")
        print("====================================\n")

        documents = []

        # -------------------------------
        # Load PDF Files
        # -------------------------------

        pdf_documents = self.pdf_loader.load_documents()

        documents.extend(
            pdf_documents
        )

        # -------------------------------
        # Load TXT Files
        # -------------------------------

        text_documents = self.text_loader.load_documents()

        documents.extend(
            text_documents
        )

        print("\n====================================")
        print(f"📄 Total Documents Loaded : {len(documents)}")
        print("====================================\n")

        return documents

    # ========================================================
    # Count Documents
    # ========================================================

    def total_documents(self):

        documents = self.load_documents()

        return len(documents)


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    DOCUMENT_FOLDER = os.path.join(

        os.path.dirname(__file__),

        "..",

        "documents"

    )

    loader = DocumentLoader(
        DOCUMENT_FOLDER
    )

    documents = loader.load_documents()

    print("\n====================================")
    print("📋 Document Summary")
    print("====================================")

    print(f"Total Loaded : {len(documents)}")

    if documents:

        print("\n✅ First Document Preview\n")

        print(documents[0].page_content[:500])

    else:

        print("\n⚠ No documents found.")