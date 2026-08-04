# ============================================================
# 🌾 AgriGenAI RAG System
# PDF Loader
# ============================================================

import os

from langchain_community.document_loaders import PyPDFLoader


# ============================================================
# PDF Loader Class
# ============================================================

class PDFLoader:

    def __init__(self, documents_folder):

        self.documents_folder = documents_folder

    # ========================================================
    # Load All PDF Documents
    # ========================================================

    def load_documents(self):

        documents = []

        # Check if folder exists
        if not os.path.exists(self.documents_folder):

            print("❌ Documents folder not found.")

            return documents

        # Read all PDF files
        for filename in os.listdir(self.documents_folder):

            if filename.lower().endswith(".pdf"):

                pdf_path = os.path.join(

                    self.documents_folder,

                    filename

                )

                try:

                    loader = PyPDFLoader(pdf_path)

                    pdf_pages = loader.load()

                    documents.extend(pdf_pages)

                    print(f"✅ Loaded : {filename}")

                except Exception as error:

                    print(f"❌ Failed : {filename}")

                    print(error)

        print("\n====================================")
        print(f"📄 Total Pages Loaded : {len(documents)}")
        print("====================================\n")

        return documents


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    DOCUMENT_FOLDER = os.path.join(

        os.path.dirname(__file__),

        "..",

        "documents"

    )

    loader = PDFLoader(DOCUMENT_FOLDER)

    documents = loader.load_documents()

    if documents:

        print("✅ First Page Preview\n")

        print(documents[0].page_content[:500])

    else:

        print("⚠ No PDF documents found.")