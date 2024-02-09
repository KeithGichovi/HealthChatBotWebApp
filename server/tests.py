from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=key)

system_message = (os.getenv('SYSTEM_MESSAGE'))

conversation = [{"role": "system", "content": system_message}]

while True:
    text_input = str(input("You: "))

    conversation.append({"role": "user", "content": text_input})

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        temperature=1,
        max_tokens=685,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    print("Maria:", response.choices[0].message.content)

    conversation.append({"role": "assistant", "content": response.choices[0].message.content})


