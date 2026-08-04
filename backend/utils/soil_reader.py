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
# Read Image
# ==========================================================

def read_soil_card(image_path):

    image = Image.open(image_path)

    text = pytesseract.image_to_string(image)

    return text


# ==========================================================
# Extract Numeric Value
# ==========================================================

def get_value(pattern, text):

    match = re.search(pattern, text, re.IGNORECASE)

    if match:

        return match.group(1)

    return ""


# ==========================================================
# Extract Soil Information
# ==========================================================

def extract_soil_information(image_path):

    text = read_soil_card(image_path)

    nitrogen = get_value(

        r"Nitrogen\s*[:\-]?\s*([0-9.]+)",

        text

    )

    phosphorus = get_value(

        r"Phosphorus\s*[:\-]?\s*([0-9.]+)",

        text

    )

    potassium = get_value(

        r"Potassium\s*[:\-]?\s*([0-9.]+)",

        text

    )

    ph = get_value(

        r"pH\s*[:\-]?\s*([0-9.]+)",

        text

    )

    organic_carbon = get_value(

        r"Organic\s*Carbon\s*[:\-]?\s*([0-9.]+)",

        text

    )

    ec = get_value(

        r"EC\s*[:\-]?\s*([0-9.]+)",

        text

    )

    # Default values if OCR cannot detect

    return {

        "nitrogen": nitrogen if nitrogen else "80",

        "phosphorus": phosphorus if phosphorus else "40",

        "potassium": potassium if potassium else "60",

        "temperature": "28",

        "humidity": "70",

        "ph": ph if ph else "6.5",

        "rainfall": "120",

        "organicCarbon": organic_carbon,

        "ec": ec,

        "rawText": text

    }


# ==========================================================
# Testing
# ==========================================================

if __name__ == "__main__":

    result = extract_soil_information(

        "uploads/soil_cards/sample.jpg"

    )

    print(result)