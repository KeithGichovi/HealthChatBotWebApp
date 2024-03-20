import openai
from functions import tools_list, get_weather
import os
from dotenv import load_dotenv

load_dotenv()


client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# Step 1: Create an Assistant
# assistant = client.beta.assistants.create(
#     name="MediSync",
#     instructions=os.getenv('SYSTEM_MESSAGE'),
#     tools=tools_list,
#     model="gpt-3.5-turbo-16k",
# )

# Step 2: Create a Thread
# thread = client.beta.threads.create()

assistant_id = "asst_BVermhKNFGLLwsdMuJzf9PMP"

thread_id = "thread_Ox9emXr14FUivyvgVRnvMfdM"


def conversation(content):
    # Step 3: Add a Message to a Thread
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=content
    )
    # Step 4: Run the Assistant
    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=assistant_id,
        instructions=os.getenv("SYSTEM_MESSAGE")
    )
    while True:
        # Wait for 5 seconds
        # Retrieve the run status
        run_status = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run.id
        )
        # If run is completed, get messages
        if run_status.status == 'completed':
            messages = client.beta.threads.messages.list(
                thread_id=thread_id
            )
            # Loop through messages and print content based on role
            print(messages)
            for msg in reversed(messages.data):
                role = msg.role
                content = msg.content[0].text.value
                print(f"{role.capitalize()}: {content}")

            break
        elif run_status.status == 'requires_action':
            required_actions = run_status.required_action.submit_tool_outputs.model_dump()
            tool_outputs = []
            import json

            for action in required_actions["tool_calls"]:
                func_name = action['function']['name']
                arguments = json.loads(action['function']['arguments'])

                if func_name == "get_weather":
                    output = get_weather(lat=arguments['lat'], lon=arguments['lon'])
                    # Convert the output to a string
                    output_str = json.dumps(output)
                    tool_outputs.append({
                        "tool_call_id": action['id'],
                        "output": output_str
                    })
                else:
                    raise ValueError(f"Unknown function: {func_name}")
            client.beta.threads.runs.submit_tool_outputs(
                thread_id=thread_id,
                run_id=run.id,
                tool_outputs=tool_outputs
            )
        else:
            #  print("Waiting for the Assistant to process...")
            pass


while True:
    user_input = input("You: ")
    conversation(user_input)
