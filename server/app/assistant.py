import openai
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv('OPENAI_API_KEY')  # api key
# system_message = os.getenv('SYSTEM_MESSAGE')  # system instructions for user.
#
client = openai.OpenAI(api_key=key)
#
# # create assistant
# assistant = client.beta.assistants.create(
#     name='MediSync',
#     instructions=system_message,
#     tools=[{"type": "code_interpreter"}, {"type": "retrieval"}],
#     model='gpt-3.5-turbo-1106'
# )

assistant_id = os.getenv('ASSISTANT_ID')

# create thread
thread = client.beta.threads.create()

print(thread.id)

# create message
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role='user',
    content='hello, i need medical advice on covid 19.',
)
print(message)
# run  it
run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=assistant_id,
    instructions='give the user direct and clear answers.'
)

print(run)

run_status = client.beta.threads.runs.retrieve(
    thread_id=thread.id,
    run_id=run.id
)

print(run_status)

if run_status.status == 'completed':
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )
    print(run_status)
    for message in messages.data:
        role = message.role
        content = message.content[0].text.value
        print(f"{role.capitalize()}: {content}")
