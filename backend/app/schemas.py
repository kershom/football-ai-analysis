from pydantic import BaseModel
from typing import Optional


class TeamCreate(BaseModel):
    name: str
    short_name: Optional[str] = None
    color: Optional[str] = None


class TeamResponse(BaseModel):
    id: int
    name: str
    short_name: Optional[str] = None
    color: Optional[str] = None

    class Config:
        from_attributes = True


class PlayerCreate(BaseModel):
    name: str
    jersey_number: Optional[int] = None
    position: Optional[str] = None
    team_id: int


class PlayerResponse(BaseModel):
    id: int
    name: str
    jersey_number: Optional[int] = None
    position: Optional[str] = None
    team_id: int

    class Config:
        from_attributes = True


class MatchCreate(BaseModel):
    name: str
    match_date: str

    home_team_id: int
    away_team_id: int

    format: str

    duration: int
    halves: int

    rules: Optional[str] = None

    home_color: Optional[str] = None
    away_color: Optional[str] = None


class MatchResponse(BaseModel):
    id: int

    name: str
    match_date: str

    home_team_id: int
    away_team_id: int

    format: str

    duration: int
    halves: int

    rules: Optional[str] = None

    home_color: Optional[str] = None
    away_color: Optional[str] = None

    class Config:
        from_attributes = True
