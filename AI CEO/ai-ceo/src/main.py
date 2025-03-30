# src/main.py

from pathlib import Path
from dotenv import load_dotenv
import os
from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

# Load the .env file from the current directory
env_path = Path(".env")
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY is not set. Please check your .env file.")

os.environ["OPENAI_API_KEY"] = api_key

class Agent:
    def __init__(self, name, system_prompt, model_name="gpt-3.5-turbo", temperature=0.7):
        self.name = name
        self.system_prompt = system_prompt
        self.llm = ChatOpenAI(model_name=model_name, temperature=temperature)
    
    def respond(self, message):
        # Build the conversation with a system prompt and the user's message
        messages = [
            SystemMessage(content=self.system_prompt),
            HumanMessage(content=message)
        ]
        response = self.llm(messages)
        return response.content

def interactive_mode(agents):
    print("Interactive Mode: Enter commands in the format 'Agent: message'.")
    print("Available agents:", ", ".join(agents.keys()))
    print("Type 'exit' to quit.\n")
    while True:
        user_input = input(">> ").strip()
        if user_input.lower() == "exit":
            break
        if ":" not in user_input:
            print("Invalid format. Please use 'Agent: message'.")
            continue
        
        agent_name, message = user_input.split(":", 1)
        agent_name = agent_name.strip()
        message = message.strip()
        
        if agent_name not in agents:
            print(f"Unknown agent '{agent_name}'. Available agents are: {', '.join(agents.keys())}.")
            continue
        
        response = agents[agent_name].respond(message)
        print(f"{agent_name}: {response}\n")

def main():
    # Define system prompts for each agent
    ceo_prompt = (
        "You are the CEO of a company. You are responsible for high-level decisions, setting priorities, "
        "and delegating tasks. Communicate clearly and professionally."
    )
    
    marketing_prompt = (
        "You are the head of marketing at the company. You are creative and strategic, always coming up with innovative "
        "campaign ideas. Provide actionable insights in your responses."
    )
    
    # Create agent instances
    ceo_agent = Agent("CEO", ceo_prompt)
    marketing_agent = Agent("Marketing", marketing_prompt)
    
    # Map agent names to their instances
    agents = {
        "CEO": ceo_agent,
        "Marketing": marketing_agent
    }
    
    # Start the interactive CLI loop
    interactive_mode(agents)

if __name__ == "__main__":
    main()
