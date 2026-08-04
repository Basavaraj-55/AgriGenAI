# ============================================================
# 🌾 AgriGenAI RAG System
# Embedding Model
# ============================================================

from langchain_huggingface import HuggingFaceEmbeddings


# ============================================================
# Embedding Model Class
# ============================================================

class EmbeddingModel:

    def __init__(self):

        print("\n====================================")
        print("🧠 Loading Embedding Model...")
        print("====================================")

        self.embedding_model = HuggingFaceEmbeddings(

            model_name="sentence-transformers/all-MiniLM-L6-v2",

            model_kwargs={

                "device": "cpu"

            },

            encode_kwargs={

                "normalize_embeddings": True

            }

        )

        print("✅ Embedding Model Loaded Successfully\n")

    # ========================================================
    # Return Embedding Model
    # ========================================================

    def get_model(self):

        return self.embedding_model

    # ========================================================
    # Embed Single Text
    # ========================================================

    def embed_query(self, text):

        return self.embedding_model.embed_query(

            text

        )

    # ========================================================
    # Embed Multiple Documents
    # ========================================================

    def embed_documents(self, documents):

        return self.embedding_model.embed_documents(

            documents

        )


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    embedding = EmbeddingModel()

    vector = embedding.embed_query(

        "How to increase crop production?"

    )

    print("====================================")
    print("Embedding Test")
    print("====================================")

    print(f"Vector Length : {len(vector)}")

    print("\nFirst 10 Values\n")

    print(vector[:10])

    print("\n✅ Embedding Model Working Successfully")