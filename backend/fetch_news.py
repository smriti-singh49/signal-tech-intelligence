import requests
import pandas as pd

API_KEY = "pub_08a73ea1cec74734811458c9533d0b6a"


def fetch_tech_news():

    query = "technology OR AI OR software OR startups OR programming"

    url = (
        f"https://newsdata.io/api/1/latest?"
        f"apikey={API_KEY}"
        f"&q={query}"
        f"&language=en"
    )

    response = requests.get(url)

    data = response.json()

    # print(data) 

    articles = data.get("results", [])

    news_data = []

    if isinstance(articles, list):

        for article in articles:

            if isinstance(article, dict):
                title = str(article.get("title", "")).lower()
                description = str(article.get("description", "")).lower()

                combined_text = title + " " + description

                relevant_keywords = [
                    "ai",
                    "artificial intelligence",
                    "software",
                    "programming",
                    "developer",
                    "engineering",
                    "technology",
                    "startup",
                    "machine learning",
                    "cybersecurity",
                    "cloud",
                    "google",
                    "microsoft",
                    "amazon",
                    "apple",
                    "meta",
                    "openai",
                    "nvidia"
                ]

                if any(keyword in combined_text for keyword in relevant_keywords):

                    news_data.append({
                    "title": article.get("title"),
                    "description": article.get("description"),
                    "content": article.get("content"),
                    "source": article.get("source_id"),
                    "link": article.get("link"),
                    "keywords": article.get("keywords")
                    })

    df = pd.DataFrame(news_data)

    df.drop_duplicates(subset=["title"], inplace=True)

    df.reset_index(drop=True, inplace=True)

    return df


if __name__ == "__main__":

    df = fetch_tech_news()

    print(df.head())