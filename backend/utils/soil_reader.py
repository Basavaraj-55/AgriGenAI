import re
import pytesseract
from PIL import Image

# ==========================================================
# Tesseract OCR Path
# ==========================================================

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# ==========================================================
# Read Soil Card Image
# ==========================================================

def read_soil_card(image_path):

    image = Image.open(image_path)

    text = pytesseract.image_to_string(image)

    return text


# ==========================================================
# Extract Soil Values
# ==========================================================

def extract_soil_values(text):

    def find_value(pattern):

        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            return match.group(1)

        return ""

    nitrogen = find_value(
        r"Nitrogen\s*[:\-]?\s*([0-9.]+)"
    )

    phosphorus = find_value(
        r"Phosphorus\s*[:\-]?\s*([0-9.]+)"
    )

    potassium = find_value(
        r"Potassium\s*[:\-]?\s*([0-9.]+)"
    )

    ph = find_value(
        r"pH\s*[:\-]?\s*([0-9.]+)"
    )

    organic_carbon = find_value(
        r"Organic\s*Carbon\s*[:\-]?\s*([0-9.]+)"
    )

    ec = find_value(
        r"EC\s*[:\-]?\s*([0-9.]+)"
    )

    return {

        "nitrogen": nitrogen,
        "phosphorus": phosphorus,
        "potassium": potassium,
        "ph": ph,
        "organicCarbon": organic_carbon,
        "ec": ec

    }


# ==========================================================
# Analyze Soil Card
# ==========================================================

def analyze_soil_card(image_path):

    try:

        text = read_soil_card(image_path)

        values = extract_soil_values(text)

        return {

            "success": True,
            "text": text,
            "data": values

        }

    except Exception as e:

        return {

            "success": False,
            "error": str(e)

        }


# ==========================================================
# Compatibility Function
# Used by app.py
# ==========================================================

def extract_soil_information(image_path):

    return analyze_soil_card(image_path)


# ==========================================================
# Testing
# ==========================================================

if __name__ == "__main__":

    sample_image = "uploads/soil_cards/sample.jpg"

    result = analyze_soil_card(sample_image)

    print(result)