import openai
from functions import tools_list, get_weather
import os
from dotenv import load_dotenv

load_dotenv()

client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])
Assistant_id = os.getenv("ASSISTANT_ID")


def assistant(content, thread_id, assistant_id=Assistant_id):
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
            return messages
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
            print("Waiting for the Assistant to process...")


