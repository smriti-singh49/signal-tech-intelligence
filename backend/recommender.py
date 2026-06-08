from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def recommend_articles(df, selected_article):

    df["combined_text"] = (
        df["title"].fillna('') + " " +
        df["description"].fillna('')
    )

    vectorizer = TfidfVectorizer(stop_words='english')

    tfidf_matrix = vectorizer.fit_transform(df["combined_text"])

    similarity_matrix = cosine_similarity(tfidf_matrix)

    article_index = df[df["title"] == selected_article].index[0]

    similarity_scores = list(enumerate(similarity_matrix[article_index]))

    sorted_articles = sorted(
        similarity_scores,
        key=lambda x: x[1],
        reverse=True
    )

    recommended_articles = []

    for i in sorted_articles[1:6]:

        recommended_articles.append({
            "title": df.iloc[i[0]]["title"],
            "description": df.iloc[i[0]]["description"],
            "source": df.iloc[i[0]]["source"],
            "link": df.iloc[i[0]]["link"],
            "similarity_score": round(i[1] * 100, 2)
        })

    return recommended_articles