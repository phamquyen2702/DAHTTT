from fastapi import APIRouter, Header, Depends, HTTPException,File,UploadFile
from model.model import Account, Class,Subject
from service.StatisticService import StatisticService
from typing import Optional, List , Union

router = APIRouter(prefix="/statistic")
statisticService = StatisticService()


@router.get("/get-class-stat-by-school")
async def get_stat_class_by_school(semester:int):
    return await statisticService.stat_class_reg_by_school(semester)
@router.get("/get-class-stat-by-day")
async def get_stat_class_by_day(semester:int):
    return await statisticService.stat_class_reg_by_day(semester)

@router.get("/get-subject-stat-by-school")
async def get_stat_subject_by_school(semester:int):
    return await statisticService.stat_subject_reg_by_school(semester)

@router.get("/get-subject-stat-by-day")
async def get_stat_subject_by_day(semester:int):
    return await statisticService.stat_subject_reg_by_day(semester)
