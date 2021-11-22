from DBConnector.account import AccountConnector

class AccountService:
    def __init__(self, ):
        self.connector = AccountConnector()
    async def get_account_by_id(self,Id):
        return await self.connector.get_account_by_id(Id)