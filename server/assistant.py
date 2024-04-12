import openai
from Open_functions import *
import os
from dotenv import load_dotenv
import json
import time
load_dotenv()

client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])
Assistant_id = os.getenv("ASSISTANT_ID")
scraper = Scraper()


def assistant(content, user_id, thread_id, assistant_id=Assistant_id):
    # Step 3: Add a Message to a Thread
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=content
    )
    get_name = get_user_name(user_id=user_id)
    # Step 4: Run the Assistant
    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=assistant_id,
        instructions=f"Refer to the user as {get_name['first_name']} {get_name['last_name']}. This is the user's full name and please greet them by their first name or both names when they greet you. You can also just use their first name."
    )
    while True:
        # Wait for 5 seconds
        time.sleep(5)
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
            return messages
        elif run_status.status == 'requires_action':
            required_actions = run_status.required_action.submit_tool_outputs.model_dump()
            tool_outputs = []
            # calls all functions given to the assistant.
            for action in required_actions["tool_calls"]:
                func_name = action['function']['name']
                arguments = json.loads(action['function']['arguments'])
                if func_name == "get_weather":
                    output = get_weather(lat=arguments['lat'], lon=arguments['lon'])
                elif func_name == "get_current_datetime_as_json":
                    output = get_current_datetime_as_json()
                elif func_name == "scrape_medicine_info":
                    output = scraper.scrape_medicine_info(medicine=arguments['medicine'])
                elif func_name == "get_user_name":
                    output = get_user_name(user_id=user_id)
                elif func_name == "fetch_appointment_type_offered":
                    output = fetch_appointment_type_offered()
                elif func_name == "book_appointment":
                    output = book_appointment(user_id=user_id, appointment_type_id=arguments['appointment_type_id'], appointment_datetime=arguments['appointment_datetime'], notes=arguments['notes'])
                else:
                    raise ValueError(f"Unknown function: {func_name}")
                # Convert the output to a string
                output_str = json.dumps(output)
                # Append tool outputs
                tool_outputs.append({
                    "tool_call_id": action['id'],
                    "output": output_str
                })
            # Submit tool outputs for this run
            client.beta.threads.runs.submit_tool_outputs(
                thread_id=thread_id,
                run_id=run.id,
                tool_outputs=tool_outputs
            )
        else:
            print("Waiting for the Assistant to process...")
