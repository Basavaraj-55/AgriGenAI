# ============================================================
# 🌾 AgriGenAI - RAG Configuration
# ============================================================

import os

# ============================================================
# Project Root
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# Documents Folder
# ============================================================

DOCUMENTS_PATH = os.path.join(
    BASE_DIR,
    "documents"
)

# ============================================================
# Vector Database Folder
# ============================================================

VECTOR_DB_PATH = os.path.join(
    BASE_DIR,
    "embeddings",
    "chroma_db"
)

# ============================================================
# Embedding Model
# ============================================================

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# ============================================================
# Gemini Model
# ============================================================

GEMINI_MODEL = "gemini-2.5-flash"

# ============================================================
# Chunk Settings
# ============================================================

CHUNK_SIZE = 1000

CHUNK_OVERLAP = 200

# ============================================================
# Retrieval Settings
# ============================================================

TOP_K_RESULTS = 5

# ============================================================
# Supported Document Types
# ============================================================

SUPPORTED_FILES = [

    ".pdf",

    ".txt"

]

# ============================================================
# Temperature
# ============================================================

TEMPERATURE = 0.3

# ============================================================
# Maximum Tokens
# ============================================================

MAX_OUTPUT_TOKENS = 1024

# ============================================================
# Prompt Settings
# ============================================================

SYSTEM_PROMPT = """
You are AgriGenAI.

You are an expert Agriculture AI Assistant.

Always answer only using the retrieved agriculture documents.

If the answer is not available inside the retrieved documents,
politely say:

'I could not find enough information in the Agriculture Knowledge Base.'

Keep answers simple.

Give step-by-step guidance.

Recommend sustainable farming practices whenever possible.
"""

# ============================================================
# Logging
# ============================================================

ENABLE_LOGGING = True

LOG_LEVEL = "INFO"

# ============================================================
# Application Name
# ============================================================

APPLICATION_NAME = "AgriGenAI RAG"

VERSION = "1.0.0"

print("✅ RAG Configuration Loaded")