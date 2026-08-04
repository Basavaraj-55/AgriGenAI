import requests

# ============================================================
# 🌾 Government Agriculture Schemes
# ============================================================

def fetch_government_schemes():

    schemes = [

        {
            "id": 1,
            "name": "PM-KISAN Samman Nidhi",
            "status": "Active",
            "benefit": "₹6000 per year",
            "eligibility": [
                "Small and Marginal Farmers",
                "Valid Aadhaar Card",
                "Land Ownership"
            ],
            "last_date": "Available Throughout the Year",
            "category": "Income Support",
            "state": "All India",
            "apply_link": "https://pmkisan.gov.in/",
            "description": "Financial assistance provided to eligible farmers."
        },

        {
            "id": 2,
            "name": "PMFBY Crop Insurance",
            "status": "Active",
            "benefit": "Crop Insurance Coverage",
            "eligibility": [
                "Registered Farmers",
                "Cultivating Crops"
            ],
            "last_date": "Season Wise",
            "category": "Insurance",
            "state": "All India",
            "apply_link": "https://pmfby.gov.in/",
            "description": "Insurance scheme protecting farmers against crop loss."
        },

        {
            "id": 3,
            "name": "Soil Health Card Scheme",
            "status": "Active",
            "benefit": "Free Soil Testing",
            "eligibility": [
                "All Farmers"
            ],
            "last_date": "Open",
            "category": "Soil",
            "state": "All India",
            "apply_link": "https://soilhealth.dac.gov.in/",
            "description": "Provides soil nutrient analysis and recommendations."
        },

        {
            "id": 4,
            "name": "Agriculture Infrastructure Fund",
            "status": "Active",
            "benefit": "Financial Assistance",
            "eligibility": [
                "Farmers",
                "FPOs",
                "Cooperative Societies"
            ],
            "last_date": "Open",
            "category": "Infrastructure",
            "state": "All India",
            "apply_link": "https://agriinfra.dac.gov.in/",
            "description": "Supports post-harvest infrastructure and community farming assets."
        }

    ]

    return schemes