from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load model và tokenizer
checkpoint = "mr4/phobert-base-vi-sentiment-analysis"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

def analyze_sentiment(text):
    inputs = tokenizer([text], padding=True, truncation=True, return_tensors="pt")
    outputs = model(**inputs)
    predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

    scores = {
        "negative": predictions[0][0].item(),
        "positive": predictions[0][1].item(),
        "neutral": predictions[0][2].item()
    }

    sentiment_label = max(scores, key=scores.get)
    scores["label"] = "Tích cực" if sentiment_label == "positive" else "Tiêu cực" if sentiment_label == "negative" else "Trung tính"

    return scores
