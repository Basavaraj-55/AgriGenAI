import feedparser

RSS_FEEDS = [
    "https://news.google.com/rss/search?q=agriculture+india",
    "https://news.google.com/rss/search?q=farming+india",
]

def fetch_agriculture_news():
    news = []

    for url in RSS_FEEDS:
        feed = feedparser.parse(url)

        for entry in feed.entries[:10]:
            news.append({
                "title": entry.title,
                "link": entry.link,
                "published": entry.get("published", "N/A"),
                "source": feed.feed.get("title", "Unknown")
            })

    return news