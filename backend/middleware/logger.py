# ==========================================================
# 🌾 AgriGenAI Logger Middleware
# backend/middleware/logger.py
# ==========================================================

import logging
import os
import time
from flask import request, g


# Create logs directory if it doesn't exist
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# Configure logging
logging.basicConfig(
    filename=os.path.join(LOG_DIR, "app.log"),
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


def init_logger(app):
    """
    Register request/response logging middleware.
    """

    @app.before_request
    def before_request():
        g.start_time = time.time()

    @app.after_request
    def after_request(response):

        duration = round((time.time() - g.start_time) * 1000, 2)

        logger.info(
            "%s %s | Status:%s | Time:%sms | IP:%s",
            request.method,
            request.path,
            response.status_code,
            duration,
            request.remote_addr
        )

        return response

    return app