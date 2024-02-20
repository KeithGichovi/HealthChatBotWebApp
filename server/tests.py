from openai import OpenAI
import os
from dotenv import load_dotenv
import time

load_dotenv()

key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=key)

system_message = (os.getenv('SYSTEM_MESSAGE'))

conversation = [{"role": "system", "content": system_message}]

while True:
    text_input = str(input("You: "))

    conversation.append({"role": "user", "content": text_input})

    start_time = time.time()

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        temperature=1,
        max_tokens=685,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    elapsed_time = time.time() - start_time

    print(f"API Response Time: {elapsed_time:.2f} seconds")

    print("MediSync:", response.choices[0].message.content)

    conversation.append({"role": "assistant", "content": response.choices[0].message.content})

