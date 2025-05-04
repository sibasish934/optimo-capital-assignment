from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Load Environment Variables
from dotenv import load_dotenv

load_dotenv()

from .sql import models
from .sql.database import engine
from .routers import bsa_reports

models.Base.metadata.create_all(bind=engine)


app = FastAPI()

origins = os.environ.get('ALLOW_ORIGINS')
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins.split(',') if origins else [],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
async def index():
    return { 'ok': True }

app.include_router(bsa_reports.router, prefix="/v1")
