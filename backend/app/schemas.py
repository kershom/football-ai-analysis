from pydantic import BaseModel
from typing import Optional


class PlayerCreate(BaseModel):
    name: str
    jersey_number: Optional[int] = None
    position: Optional[str] = None
    team_id: int


class PlayerResponse(BaseModel):
    id: int
    name: str
    jersey_number: Optional[int]
    position: Optional[str]
    team_id: int

    class Config:
        from_attributes = True
