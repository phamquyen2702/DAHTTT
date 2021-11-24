from DBConnector.account import AccountConnector
from model.model import *
class AccountService:
    def __init__(self, ):
        self.connector = AccountConnector()
    async def get_account_by_id(self,Id,email):
        return await self.connector.get_account_by_id(Id,email)

    async def search(self,limit = 20, offset=0, **kwargs):
        return await self.connector.search(limit=limit,offset=offset,**kwargs)

    async def update_one(self,account:Account):
        return await self.connector.update([account])