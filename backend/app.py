from fastapi import FastAPI, Request, APIRouter
from fastapi.responses import HTMLResponse
from router import AccountRouter, ClassRouter
from router import SubjectRouter
from router import OTERouter, RegClassRouter, RegSubjectRouter, StatisticRouter
import uvicorn, time
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
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
app.include_router(StatisticRouter.router)


class SPAStaticFiles(StaticFiles):
	async def get_response(self, path: str, scope):
		response = await super().get_response(path, scope)
		if response.status_code == 404:
			response = await super().get_response('.', scope)
		return response

app.mount('/', SPAStaticFiles(directory='dist', html=True), name='dist')


"""
#app.mount("/", StaticFiles(directory="./dist"), name="dist")
templates = Jinja2Templates(directory="./dist")


@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
	return templates.TemplateResponse("index.html", {"request": request})
"""
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
