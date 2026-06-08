from fetch_news import fetch_tech_news
from recommender import recommend_articles

df = fetch_tech_news()

print("\nAvailable Articles:\n")

for i, title in enumerate(df["title"]):
    print(f"{i+1}. {title}")

selected_article = df["title"].iloc[0]

print("\nSelected Article:\n")
print(selected_article)

recommendations = recommend_articles(
    df,
    selected_article
)

print("\nRecommended Articles:\n")

for article in recommendations:
    print(
        article["similarity_score"],
        "%",
        article["title"]
    )