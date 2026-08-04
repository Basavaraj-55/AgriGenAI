# ============================================================
# 🌾 AgriGenAI RAG System
# Text File Loader
# ============================================================

import os

from langchain_core.documents import Document


# ============================================================
# Text Loader Class
# ============================================================

class TextLoader:

    def __init__(self, documents_folder):

        self.documents_folder = documents_folder

    # ========================================================
    # Load All TXT Documents
    # ========================================================

    def load_documents(self):

        documents = []

        # Check Folder Exists
        if not os.path.exists(self.documents_folder):

            print("❌ Documents folder not found.")

            return documents

        # Read All Text Files
        for filename in os.listdir(self.documents_folder):

            if filename.lower().endswith(".txt"):

                file_path = os.path.join(

                    self.documents_folder,

                    filename

                )

                try:

                    with open(

                        file_path,

                        "r",

                        encoding="utf-8"

                    ) as file:

                        text = file.read()

                    document = Document(

                        page_content=text,

                        metadata={

                            "source": filename,

                            "type": "text"

                        }

                    )

                    documents.append(document)

                    print(f"✅ Loaded : {filename}")

                except Exception as error:

                    print(f"❌ Failed : {filename}")

                    print(error)

        print("\n====================================")
        print(f"📄 Total Text Files Loaded : {len(documents)}")
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

    loader = TextLoader(

        DOCUMENT_FOLDER

    )

    documents = loader.load_documents()

    if documents:

        print("✅ First Text Preview\n")

        print(documents[0].page_content[:500])

    else:

        print("⚠ No TXT files found.")