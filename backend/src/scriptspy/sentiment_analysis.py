import sys
import json
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import os

if os.name == 'nt':
    sys.stdout.reconfigure(encoding='utf-8')

# Tải mô hình và tokenizer
checkpoint = "mr4/phobert-base-vi-sentiment-analysis"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

# In ra sys.argv để kiểm tra đầu vào
print("sys.argv:", sys.argv, file=sys.stderr)

try:
    # Giải mã đầu vào từ Node.js, sử dụng mã hóa UTF-8
    raw_inputs = json.loads(sys.argv[1].encode('utf-8').decode('utf-8')) 
    print("Received inputs:", raw_inputs, file=sys.stderr)
except (IndexError, json.JSONDecodeError) as e:
    print(json.dumps({"error": "Invalid input"}, ensure_ascii=False))
    print("Error decoding input:", str(e), file=sys.stderr)
    sys.exit(1)

sentiment_results = []

for review in raw_inputs:
    try:
        # Tiền xử lý và phân tích tình cảm
        inputs = tokenizer([review], padding=True, truncation=True, return_tensors="pt")
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

        positive_score = predictions[0][2].item()
        negative_score = predictions[0][0].item()
        neutral_score = predictions[0][1].item()

        if positive_score > max(negative_score, neutral_score):
            sentiment_label = "Tích cực"
        elif negative_score > max(positive_score, neutral_score):
            sentiment_label = "Tiêu cực"
        else:
            sentiment_label = "Trung tính"

        sentiment_result = {
            "positive": positive_score,
            "negative": negative_score,
            "neutral": neutral_score,
            "label": sentiment_label
        }

        print(f"Processed review: {review}", file=sys.stderr)
        print(f"Sentiment result: {sentiment_result}", file=sys.stderr)

        sentiment_results.append(sentiment_result)
    except Exception as e:
        print(f"Error processing review: {review}", str(e), file=sys.stderr)

print(json.dumps(sentiment_results, ensure_ascii=False))
