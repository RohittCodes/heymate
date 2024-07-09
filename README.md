# HeyMate

HeyMate is a messaging app that allows users to chat with their friends and family. A place to hangout and have fun with your friends.

## Setup

n. MindsDB Setup

m. Setup an ML Engine
```
CREATE ML_ENGINE minds_endpoint_engine
FROM minds_endpoint
USING
      minds_endpoint_api_key = 'api-key-value';

```

n. Create a model

```
CREATE MODEL model_name --replace model_name with the model you would like to create
PREDICT answer
USING
      engine = 'minds_endpoint_engine',
      model_name = 'model-name',  --replace model-name with the model you would like to use
      prompt_template = 'prompt-to-the-model'  --replace prompt-to-the-model with the prompt_template you would like to use
```

o. Query the model to test it in mindsdb editor
```
SELECT text, answer
FROM minds_endpoint_model
WHERE text = 'I love machine learning!';
```