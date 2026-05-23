import streamlit as st

from backend.fetch_news import fetch_tech_news
from backend.recommender import recommend_articles


st.set_page_config(
    page_title="Tech News Recommender",
    layout="wide"
)

st.title("📰 Tech News Recommender")

st.write(
    "Stay updated with personalized tech industry news recommendations."
)

df = fetch_tech_news()

article_titles = df["title"].tolist()

selected_article = st.selectbox(
    "Select an article:",
    article_titles
)

if st.button("Get Recommendations"):

    recommendations = recommend_articles(
        df,
        selected_article
    )

    st.subheader("Recommended Articles")

    for article in recommendations:

        st.write("✅", article)