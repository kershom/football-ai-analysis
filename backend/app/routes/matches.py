from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from .. import models
from ..schemas import MatchCreate, MatchResponse


router = APIRouter(
    prefix="/matches",
    tags=["Matches"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[MatchResponse])
def get_matches(
    db: Session = Depends(get_db),
):
    return db.query(models.Match).all()


@router.post("/", response_model=MatchResponse)
def create_match(
    match: MatchCreate,
    db: Session = Depends(get_db),
):

    home_team = (
        db.query(models.Team)
        .filter(models.Team.id == match.home_team_id)
        .first()
    )

    if not home_team:
        raise HTTPException(
            status_code=404,
            detail="Home team not found",
        )

    away_team = (
        db.query(models.Team)
        .filter(models.Team.id == match.away_team_id)
        .first()
    )

    if not away_team:
        raise HTTPException(
            status_code=404,
            detail="Away team not found",
        )

    if match.home_team_id == match.away_team_id:
        raise HTTPException(
            status_code=400,
            detail="Home team and away team must be different",
        )

    new_match = models.Match(
        name=match.name,
        match_date=match.match_date,
        home_team_id=match.home_team_id,
        away_team_id=match.away_team_id,
        format=match.format,
        duration=match.duration,
        halves=match.halves,
        rules=match.rules,
        home_color=match.home_color,
        away_color=match.away_color,
    )

    db.add(new_match)
    db.commit()
    db.refresh(new_match)

    return new_match


@router.get("/{match_id}", response_model=MatchResponse)
def get_match(
    match_id: int,
    db: Session = Depends(get_db),
):

    match = (
        db.query(models.Match)
        .filter(models.Match.id == match_id)
        .first()
    )

    if not match:
        raise HTTPException(
            status_code=404,
            detail="Match not found",
        )

    return match


@router.delete("/{match_id}")
def delete_match(
    match_id: int,
    db: Session = Depends(get_db),
):

    match = (
        db.query(models.Match)
        .filter(models.Match.id == match_id)
        .first()
    )

    if not match:
        raise HTTPException(
            status_code=404,
            detail="Match not found",
        )

    db.delete(match)
    db.commit()

    return {
        "message": "Match deleted successfully",
        "match_id": match_id,
    }
