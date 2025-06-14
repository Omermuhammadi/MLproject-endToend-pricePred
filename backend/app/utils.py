# backend/app/utils.py

def get_price_range(prediction: int) -> tuple[str, str]:
    """Maps prediction class to a price range and label."""
    mapping = {
        0: ("$100–150", "Budget"),
        1: ("$151–300", "Mid-Range"),
        2: ("$301–600", "High-End"),
        3: ("$700+", "Flagship"),
    }
    return mapping.get(prediction, ("Unknown", "Unknown"))
