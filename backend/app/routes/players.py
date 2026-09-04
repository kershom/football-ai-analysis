from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from .. import models
from ..schemas import PlayerCreate, PlayerResponse


router = APIRouter(
    prefix="/players",
    tags=["Players"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=PlayerResponse)
def create_player(
    player: PlayerCreate,
    db: Session = Depends(get_db),
):
    # Check that the team exists
    team = (
        db.query(models.Team)
        .filter(models.Team.id == player.team_id)
        .first()
    )

    if not team:
        raise HTTPException(
            status_code=404,
            detail="Team not found",
        )

    new_player = models.Player(
        name=player.name,
        jersey_number=player.jersey_number,
        position=player.position,
        team_id=player.team_id,
    )

    db.add(new_player)
    db.commit()
    db.refresh(new_player)

    return new_player


@router.get("/", response_model=list[PlayerResponse])
def get_players(
    db: Session = Depends(get_db),
):
    return db.query(models.Player).all()


@router.get("/{player_id}", response_model=PlayerResponse)
def get_player(
    player_id: int,
    db: Session = Depends(get_db),
):
    player = (
        db.query(models.Player)
        .filter(models.Player.id == player_id)
        .first()
    )

    if not player:
        raise HTTPException(
            status_code=404,
            detail="Player not found",
        )

    return player


@router.delete("/{player_id}")
def delete_player(
    player_id: int,
    db: Session = Depends(get_db),
):
    player = (
        db.query(models.Player)
        .filter(models.Player.id == player_id)
        .first()
    )

    if not player:
        raise HTTPException(
            status_code=404,
            detail="Player not found",
        )

    db.delete(player)
    db.commit()

    return {
        "message": "Player deleted successfully",
    }
