from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import HTMLResponse
from router import AccountRouter, ClassRouter
from router import SubjectRouter
from router import OTERouter
import uvicorn, time

app = FastAPI()

app.include_router(AccountRouter.router)
app.include_router(ClassRouter.router)
app.include_router(SubjectRouter.router)
app.include_router(OTERouter.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")