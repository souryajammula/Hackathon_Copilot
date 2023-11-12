
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from typing import Optional
import os
import logging
from dotenv import load_dotenv  # Import the dotenv module

load_dotenv()

app = FastAPI()

# Create a logger instance
logger = logging.getLogger(__name__)


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# TAX_PDF_PATH = "/Applications/XAMPP/xamppfiles/htdocs/Hackathon-copilot/Backend/taxpdf.pdf"
TAX_PDF_PATH = "/Applications/XAMPP/xamppfiles/htdocs/Hackathon_Copilot/Backend/tax1.pdf"

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    user_input: str

class Message(BaseModel):
    user: str
    text: str

chat_history = []  # In-memory storage for chat messages

def chat_with_openai(user_input):
    try:
        os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY

        # Read the PDF file in binary mode
        with open(TAX_PDF_PATH, 'rb') as pdf_file:
            pdf_text = pdf_file.read().decode('utf-8', errors='ignore')

        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=800,
            chunk_overlap=200,
            length_function=len,
        )
        texts = text_splitter.split_text(pdf_text)
        embeddings = OpenAIEmbeddings()
        document_search = FAISS.from_texts(texts, embeddings)
        chain = load_qa_chain(OpenAI(), chain_type="stuff")
        docs = document_search.similarity_search(user_input)
        result = chain.run(input_documents=docs, question=user_input)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing user input: {str(e)}")


@app.post("/chat")
async def chat_with_user_input(chat_request: ChatRequest):
    try:
        response = chat_with_openai(chat_request.user_input)

        # Save the chat message to the in-memory storage
        chat_history.append(Message(user="User", text=chat_request.user_input))
        chat_history.append(Message(user="Bot", text=response))

        return {"response": response}
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.get("/get_chat_history")
async def get_chat_history():
    return chat_history

# Configure logging
logging.basicConfig(level=logging.DEBUG,
                    handlers=[logging.FileHandler("debug.log"),
                              logging.StreamHandler()])






# # # uvicorn app:app --reload --host 0.0.0.0 --port 8000
