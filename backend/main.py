from fastapi import FastAPI
from backend.fetch_news import fetch_tech_news
from backend.recommender import recommend_articles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "message": "Signal Tech Intelligence API Running"
    }

@app.get("/news")
def get_news():

    df = fetch_tech_news()

    print("Articles returned:", len(df))

    df = df.fillna("")

    return df.to_dict(
        orient="records"
    )

@app.get("/recommendations")
def get_recommendations(title: str):

    df = fetch_tech_news()

    recommendations = recommend_articles(
        df,
        title
    )

    return recommendations