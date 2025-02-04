# tiffinwala_dashboard.py
import streamlit as st
import pandas as pd
import plotly.express as px
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from textblob import TextBlob
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np
import json
import os
from transformers import pipeline

# Download NLTK stopwords if not already downloaded
nltk_data_path = os.path.expanduser('~/nltk_data')
if not os.path.exists(os.path.join(nltk_data_path, 'corpora', 'stopwords')):
    nltk.download('stopwords', download_dir=nltk_data_path)

# Streamlit Setup
st.set_page_config(
    page_title="Tiffinwala Excellence Dashboard",
    layout="wide",
    page_icon="🍱",
    initial_sidebar_state="expanded"
)

# Custom CSS for enhanced styling and larger fonts
st.markdown("""
<style>
    /* Global font and background settings */
    html, body {
        font-size: 20px !important;
        background-color: #f0f2f6;
    }
    
    /* Container padding */
    .css-18e3th9 {
        padding: 2rem 5rem;
    }
    
    /* Title and Header Styling */
    h1 {
        font-size: 40px !important;
        color: #2d3436 !important;
        text-align: center;
        margin-bottom: 1rem;
    }
    h2, h3, h4 {
        color: #2d3436 !important;
        font-weight: 600;
    }
    
    /* Metric cards styling */
    [data-testid="metric-container"] {
        font-size: 22px !important;
        padding: 1rem !important;
        border: 1px solid #e0e0e0 !important;
        border-radius: 10px !important;
        transition: all 0.3s ease;
    }
    [data-testid="metric-container"]:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    
    /* AI Summary Box Styling */
    .summary-text {
        font-size: 22px !important;
        line-height: 1.8 !important;
        padding: 2rem;
        background: #2d3436;
        color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        margin: 1rem 0;
    }
    
    /* Sidebar text */
    .css-1d391kg {
        font-size: 20px !important;
    }
</style>
""", unsafe_allow_html=True)

plt.style.use('ggplot')

# Load Data
@st.cache_data
def load_data():
    with open('tiffinwala_reviews.json') as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    df['dates'] = pd.to_datetime(df['dates'])
    return df

df = load_data()

# Dish Keywords (Ensure these are lowercase for consistent processing)
dish_keywords = [
    'dal', 'paneer', 'thepla', 'khandvi', 'undhiyu', 'kadhi', 'fafda', 'bajra rotla',
    'sev tameta nu shaak', 'ringan no olo', 'bhinda nu shaak', 'dudhi nu shaak',
    'batata nu shaak', 'lasaniya batata', 'karela nu shaak', 'dudhi chana nu shaak',
    'patra', 'khaman', 'handvo', 'puri', 'mooli paratha', 'masala khichdi', 'ghughra'
]

# Data Preprocessing
@st.cache_data
def enhance_data(df):
    # Sentiment analysis using TextBlob
    df['sentiment'] = df['description'].apply(lambda x: TextBlob(x).sentiment.polarity)
    df['sentiment_category'] = pd.cut(df['sentiment'],
                                      bins=[-1, -0.1, 0.1, 1],
                                      labels=['Negative', 'Neutral', 'Positive'])
    # Convert description to lowercase for consistent matching
    df['description'] = df['description'].str.lower()
    for dish in dish_keywords:
        df[dish] = df['description'].str.contains(dish, case=False, na=False)
    return df

df = enhance_data(df)

# Train Simple Prediction Model
@st.cache_resource
def train_model(df):
    vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    X = vectorizer.fit_transform(df['description'])
    y = (df['ratings'] <= 2).astype(int)  # Predict low ratings (1-2 stars)
    model = LogisticRegression()
    model.fit(X, y)
    return vectorizer, model

vectorizer, model = train_model(df)

# Load Summarizer (using a smaller model for faster inference on CUDA)
@st.cache_resource
def load_summarizer():
    return pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", device=0)

# Generate AI Summary with optimizations
def generate_summary(texts):
    # Combine reviews and clean text
    combined_text = " ".join(texts)
    # Limit the input length to reduce memory usage and processing time
    max_input_length = 1024  # Increased length while still keeping it optimized
    if len(combined_text) > max_input_length:
        combined_text = combined_text[:max_input_length]
    summarizer = load_summarizer()
    try:
        # Increase output length while balancing resource usage
        summary = summarizer(
            combined_text,
            max_length=400,  # Increased summary length
            min_length=200,
            do_sample=False,
            truncation=True
        )[0]['summary_text']
        # Post-process summary for better readability
        summary = summary.capitalize()  # Capitalize first letter
        summary = summary.strip()  # Remove extra whitespace
        if not summary.endswith('.'):
            summary += '.'
        return summary
    except Exception as e:
        st.error(f"Error generating summary: {str(e)}")
        return None

# ======================
# Dashboard Layout
# ======================
st.title("🍱 Tiffinwala Excellence Dashboard")
st.markdown("""
<div style="text-align:center; margin-bottom:2rem;">
    <h3 style="color:#636e72;">Hackathon-Ready Analytics Platform</h3>
    <p style="font-size:1.3rem;">Transform 1000+ reviews into actionable insights</p>
</div>
""", unsafe_allow_html=True)

# Sidebar Controls
with st.sidebar:
    st.header("🔍 Control Panel")
    st.markdown("---")
    selected_ratings = st.multiselect(
        "*Filter by Ratings*",
        options=sorted(df['ratings'].unique()),
        default=[1, 2, 3, 4, 5]
    )
    date_range = st.date_input(
        "*Date Range*",
        value=[df['dates'].min(), df['dates'].max()],
        min_value=df['dates'].min(),
        max_value=df['dates'].max()
    )
    st.markdown("---")
    st.markdown("*Made with ❤ by Your Team*")

# Apply filters
filtered_df = df[
    (df['ratings'].isin(selected_ratings)) &
    (df['dates'] >= pd.to_datetime(date_range[0])) &
    (df['dates'] <= pd.to_datetime(date_range[1]))
    ]

# ======================
# Key Metrics
# ======================
st.header("📊 Executive Summary")
metric_cols = st.columns(4)
if len(filtered_df) > 0:
    metric_cols[0].metric("Total Reviews", len(filtered_df), help="Total reviews in selected period")
    metric_cols[1].metric("Average Rating",
                          f"{filtered_df['ratings'].mean():.1f} ⭐",
                          help="Average customer rating (1-5 scale)")
    metric_cols[2].metric("Positive Sentiment",
                          f"{(filtered_df['sentiment_category'] == 'Positive').mean():.0%}",
                          "Percentage of positive reviews")
    metric_cols[3].metric("Low Rating Risk",
                          f"{model.predict_proba(vectorizer.transform(filtered_df['description']))[:,1].mean():.0%}",
                          "Probability of low ratings (1-2 stars)")
else:
    for col in metric_cols:
        col.metric("No Data", "N/A")

# ======================
# AI-Powered Summary
# ======================
st.markdown("---")
st.header("🤖 AI-Powered Insights Report")
if len(filtered_df) > 0:
    with st.spinner('Analyzing reviews... This might take a moment'):
        try:
            summary = generate_summary(filtered_df['description'].tolist())
            if summary:
                st.markdown(f"""
                <div class="summary-text">
                    <strong>Summary:</strong><br>{summary}
                </div>
                """, unsafe_allow_html=True)

                # Key highlights
                st.subheader("🔑 Strategic Insights")
                insight_cols = st.columns(3)
                insight_cols[0].metric(
                    "Top Performer Dish",
                    filtered_df[dish_keywords].sum().idxmax(),
                    help="Most frequently mentioned dish"
                )
                insight_cols[1].metric(
                    "Peak Feedback Day",
                    filtered_df['dates'].dt.day_name().mode()[0],
                    help="Day with most reviews"
                )
                insight_cols[2].metric(
                    "Dominant Sentiment",
                    filtered_df['sentiment_category'].mode()[0],
                    delta_color="off",
                    help="Most common customer sentiment"
                )

                # Sentiment progress bars
                st.subheader("📈 Sentiment Distribution")
                sentiment_progress = filtered_df['sentiment_category'].value_counts(normalize=True)
                cols = st.columns(3)
                for idx, (sentiment, value) in enumerate(sentiment_progress.items()):
                    cols[idx].progress(value, text=f"{sentiment} ({value:.0%})")
            else:
                st.warning("Could not generate summary. Please try different filters.")
        except Exception as e:
            st.error(f"Analysis failed: {str(e)}")
else:
    st.warning("No data available for analysis with current filters")

# ======================
# Interactive Visualizations
# ======================
st.markdown("---")
st.header("📈 Deep Dive Analytics")
viz_col1, viz_col2 = st.columns(2)

with viz_col1:
    # Time Series Analysis
    st.subheader("📅 Rating Trends Over Time")
    if not filtered_df.empty:
        time_df = filtered_df.set_index('dates').resample('W')['ratings'].mean().reset_index()
        fig = px.line(time_df, x='dates', y='ratings',
                      template='plotly_white',
                      labels={'ratings': 'Average Rating'},
                      line_shape="spline",
                      color_discrete_sequence=['#0984e3'])
        fig.update_layout(
            hovermode="x unified",
            height=400,
            margin=dict(l=0, r=0),
            font=dict(size=18),
            title=dict(font=dict(size=24)),
            xaxis=dict(title=dict(font=dict(size=20))),
            yaxis=dict(title=dict(font=dict(size=20)))
        )
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.warning("No data available for timeline analysis")

    # Dish Popularity
    st.subheader("🍽 Dish Popularity Index")
    dish_columns = list(set(filtered_df.columns) & set(dish_keywords))
    if dish_columns and not filtered_df.empty:
        dish_counts = filtered_df[dish_columns].sum().sort_values(ascending=False)
        fig = px.bar(dish_counts, orientation='h',
                     labels={'value': 'Mentions', 'index': 'Dish'},
                     color=dish_counts.values,
                     color_continuous_scale='Blues')
        fig.update_layout(showlegend=False, height=400, font=dict(size=18))
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.warning("No dish mentions found in filtered reviews")

with viz_col2:
    # Sentiment Analysis
    st.subheader("😃 Sentiment Landscape")
    if not filtered_df.empty:
        sentiment_counts = filtered_df['sentiment_category'].value_counts()
        fig = px.pie(sentiment_counts,
                     names=sentiment_counts.index,
                     values=sentiment_counts.values,
                     hole=0.4,
                     color_discrete_sequence=['#00b894', '#fdcb6e', '#d63031'])
        fig.update_layout(height=400, font=dict(size=18))
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.warning("No sentiment data available")

    # Word Cloud
    st.subheader("🔍 Trending Keywords")
    if not filtered_df.empty:
        text = ' '.join(filtered_df['description'])
        if text.strip():
            stop_words = set(stopwords.words('english'))
            wordcloud = WordCloud(width=800, height=400,
                                  background_color='white',
                                  stopwords=stop_words,
                                  colormap='viridis').generate(text)
            plt.figure(figsize=(10, 5))
            plt.imshow(wordcloud, interpolation='bilinear')
            plt.axis('off')
            st.pyplot(plt, use_container_width=True)
        else:
            st.warning("No text content for word cloud")
    else:
        st.warning("No data available for word cloud")

# ======================
# Footer
# ======================
st.markdown("---")
st.markdown("""
<div style="text-align:center; padding:2rem 0; color:#636e72;">
    Tiffinwala Analytics Platform · Built for Excellence · Hackathon 2024
</div>
""", unsafe_allow_html=True)