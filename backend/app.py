from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import HTMLResponse
from router import AccountRouter, ClassRouter
from router import SubjectRouter
from router import OTERouter, RegClassRouter, RegSubjectRouter
import uvicorn, time
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(AccountRouter.router)
app.include_router(ClassRouter.router)
app.include_router(SubjectRouter.router)
app.include_router(RegClassRouter.router)
app.include_router(RegSubjectRouter.router)
app.include_router(OTERouter.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
