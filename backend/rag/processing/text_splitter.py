# ============================================================
# 🌾 AgriGenAI RAG System
# Text Splitter
# ============================================================

from langchain_text_splitters import RecursiveCharacterTextSplitter


# ============================================================
# Text Splitter Class
# ============================================================

class TextSplitter:

    def __init__(

        self,

        chunk_size=1000,

        chunk_overlap=200

    ):

        self.splitter = RecursiveCharacterTextSplitter(

            chunk_size=chunk_size,

            chunk_overlap=chunk_overlap,

            length_function=len,

            separators=[

                "\n\n",

                "\n",

                ".",

                "!",

                "?",

                " ",

                ""

            ]

        )

    # ========================================================
    # Split Documents
    # ========================================================

    def split_documents(

        self,

        documents

    ):

        chunks = self.splitter.split_documents(

            documents

        )

        print("\n===================================")
        print(f"📄 Total Chunks : {len(chunks)}")
        print("===================================\n")

        return chunks


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    import os

    from rag.loaders.pdf_loader import PDFLoader

    DOCUMENT_FOLDER = os.path.join(

        os.path.dirname(__file__),

        "..",

        "documents"

    )

    loader = PDFLoader(

        DOCUMENT_FOLDER

    )

    documents = loader.load_documents()

    splitter = TextSplitter()

    chunks = splitter.split_documents(

        documents

    )

    if chunks:

        print("✅ First Chunk\n")

        print(chunks[0].page_content)

    else:

        print("❌ No Chunks Created")