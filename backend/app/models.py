from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    short_name = Column(String, nullable=True)
    color = Column(String, nullable=True)

    players = relationship(
        "Player",
        back_populates="team",
        cascade="all, delete-orphan",
    )


class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    jersey_number = Column(Integer, nullable=True)
    position = Column(String, nullable=True)

    team_id = Column(
        Integer,
        ForeignKey("teams.id"),
        nullable=False,
    )

    team = relationship(
        "Team",
        back_populates="players",
    )
