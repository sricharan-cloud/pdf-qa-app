# Evaluation

## Output Quality

The system provides accurate answers when the information is present in the document.

## Representative Cases

1. Question: What is the document about?
Result: Correct summary

2. Question: List key points
Result: Relevant points returned

3. Question: What is the conclusion?
Result: Correct

4. Question: Who is mentioned in the document?
Result: Correct

5. Question: Summarize the document
Result: Accurate summary


## Failure Cases

1. Large document:
Result: Answer may be incomplete due to context limits

2. Question not in document:
Before improvement: Model guessed
After improvement: Returns "Not found in document"


## Baseline Comparison

Baseline: Asking question without document context

Result:
The model produces generic answers unrelated to the document

Conclusion:
Including document context significantly improves accuracy


## Upstream Evaluation

Component: PDF text extraction

Observation:
Some formatting is lost during extraction

Impact:
Can reduce answer accuracy
