from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Team
from ..schemas import TeamCreate, TeamResponse


router = APIRouter(
    prefix="/teams",
    tags=["Teams"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[TeamResponse])
def get_teams(db: Session = Depends(get_db)):
    return db.query(Team).all()


@router.post("/", response_model=TeamResponse)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    new_team = Team(
        name=team.name,
        short_name=team.short_name,
        color=team.color,
    )

    db.add(new_team)
    db.commit()
    db.refresh(new_team)

    return new_team


@router.get("/{team_id}", response_model=TeamResponse)
def get_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()

    if not team:
        raise HTTPException(
            status_code=404,
            detail="Team not found",
        )

    return team


@router.delete("/{team_id}")
def delete_team(team_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()

    if not team:
        raise HTTPException(
            status_code=404,
            detail="Team not found",
        )

    db.delete(team)
    db.commit()

    return {
        "message": "Team deleted successfully",
        "team_id": team_id,
    }
