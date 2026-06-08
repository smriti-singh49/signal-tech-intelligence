import requests
import pandas as pd

API_KEY = "pub_08a73ea1cec74734811458c9533d0b6a"


def fetch_tech_news():

    url = (
        f"https://newsdata.io/api/1/latest?"
        f"apikey={API_KEY}"
        f"&category=technology"
        f"&language=en"
    )

    all_articles = []

    next_page = None

    for page_num in range(1):

        if page_num == 0:

            url = (
                f"https://newsdata.io/api/1/latest?"
                f"apikey={API_KEY}"
                f"&category=technology"
                f"&language=en"
            )

        else:

            url = (
                f"https://newsdata.io/api/1/latest?"
                f"apikey={API_KEY}"
                f"&category=technology"
                f"&language=en"
                f"&page={next_page}"
            )

        response = requests.get(url)

        data = response.json()
        print(data)

        if data.get("status") != "success":
            break

        all_articles.extend(
            data.get("results", [])
        )

        next_page = data.get("nextPage")

        if not next_page:
            break

    articles = all_articles

    # print("Total collected:", len(articles))
    # print(f"Total articles fetched: {len(articles)}")

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
                    "machine learning",
                    "llm",
                    "openai",
                    "chatgpt",
                    "claude",
                    "gemini",
                    "nvidia",
                    "google",
                    "microsoft",
                    "meta",
                    "amazon",

                    "software",
                    "developer",
                    "programming",
                    "github",

                    "cybersecurity",
                    "hacker",
                    "security",
                    "malware",

                    "cloud",
                    "aws",
                    "azure",
                    "kubernetes",

                    "startup",
                    "funding",
                    "y combinator"
                ]

                # print(article.get("title"))

                matched_keywords = [
                    keyword
                    for keyword in relevant_keywords
                    if keyword in combined_text
                ]

                if len(matched_keywords) >= 1:

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

    # print("Articles after filtering:", len(df))

    return df


if __name__ == "__main__":

    df = fetch_tech_news()

    print(df.head())