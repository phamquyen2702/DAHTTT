from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import HTMLResponse
from router import AccountRouter
import uvicorn
app = FastAPI()

app.include_router(AccountRouter.router)


if __name__ == "__main__":
    uvicorn.run(app,host="0.0.0.0")