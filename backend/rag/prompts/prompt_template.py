# ============================================================
# 🌾 AgriGenAI RAG System
# Prompt Template
# ============================================================

from langchain_core.prompts import ChatPromptTemplate


# ============================================================
# Prompt Builder
# ============================================================

class PromptTemplateBuilder:

    def __init__(self):

        self.prompt = ChatPromptTemplate.from_template(

            """
You are AgriGenAI.

You are an expert Agriculture AI Assistant.

You must answer ONLY using the information available inside the CONTEXT.

---------------------------------------------------

CONTEXT

{context}

---------------------------------------------------

QUESTION

{question}

---------------------------------------------------

Instructions

1. Read the CONTEXT carefully.

2. Answer only from the CONTEXT.

3. Never make up information.

4. If the answer is unavailable in the CONTEXT, reply:

"I could not find enough information in the Agriculture Knowledge Base."

5. Keep the answer simple.

6. Explain in farmer-friendly language.

7. Give step-by-step guidance whenever possible.

8. Mention fertilizer, irrigation, prevention and safety tips if available.

9. Keep the answer between 100-300 words.

10. End every answer with:

🌾 Thank you for using AgriGenAI.

---------------------------------------------------

ANSWER

"""
        )

        print("✅ Prompt Template Loaded")

    # ========================================================
    # Return Prompt
    # ========================================================

    def get_prompt(self):

        return self.prompt

    # ========================================================
    # Format Prompt
    # ========================================================

    def format(

        self,

        context,

        question

    ):

        return self.prompt.format(

            context=context,

            question=question

        )


# ============================================================
# Testing
# ============================================================

if __name__ == "__main__":

    builder = PromptTemplateBuilder()

    context = """
Tomato plants require fertile soil.

Late blight can be controlled using Mancozeb.

Maintain proper irrigation.
"""

    question = "How can I control late blight?"

    prompt = builder.format(

        context,

        question

    )

    print("\n====================================")
    print("Generated Prompt")
    print("====================================\n")

    print(prompt)