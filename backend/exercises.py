from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine

levels = {1: 6, 
          2: 12.5,
          3: 19,
          4: 25,
          5: 31,
          6: 37.5,
          7: 44,
          8: 50,
          9: 56,
          10: 62.5,
          11: 69,
          12: 75,
          13: 81,
          14: 87.5,
          15: 94,
          16: 100
            }

def seed_exercises(db: Session):
    exercises = [
        {"name": "elevated OA PU", "level": 31},
        {"name": "Straddle OA PU", "level": 37.5},
        {"name": "rings str. OA PU", "level": 44},
        {"name": "straight bdy OA PU", "level": 50},
        {"name": "rings SB OA PU", "level": 56},
        {"name": "Pushups", "level": 6},
        {"name": "Diamond Pushups", "level": 12.5},
        {"name": "Ring Wide PU", "level": 19},
        {"name": "Ring PU", "level": 25},
        {"name": "RTO Pushups", "level": 31},
        {"name": "RTO Archer PU", "level": 37.5},
        {"name": "RTO 40 deg PPPU", "level": 44},
        {"name": "RTO 60 deg PPPU", "level": 50},
        {"name": "RTO maltese PU", "level": 56},
        {"name": "wall PPPU", "level": 62.5},
        {"name": "R wall PPPU", "level": 69},
        {"name": "wall maltese PU", "level": 75},
        {"name": "R wall maltese PU", "level": 81},
        {"name": "Planche", "level": 68},
        {"name": "Tuck FL", "level": 25},
        {"name": "ADV. Tuck FL", "level": 31},
        {"name": "Straddle FL", "level": 37.5},
        {"name": "1 Leg FL", "level": 44},
        {"name": "Full Front Lever", "level": 50},
        {"name": "FL to inverted", "level": 56},
        {"name": "Hang pull to inv", "level": 62.5},
        {"name": "Circle FLs", "level": 69},
        {"name": "Circle Yle", "level": 69},
        {"name": "Circle Deeng", "level": 69},
        {"name": "Circle Piing", "level": 69},
    ]

    for exercise in exercises:
        existing_exercise = db.query(models.Exercises).filter_by(name=exercise["name"]).first()

        if existing_exercise:
            existing_exercise.level = exercise["level"]
            existing_exercise.name = exercise["name"]
        else:    
            db_exercise = models.Exercises(**exercise)
            db.add(db_exercise)

    db.commit()

models.Base.metadata.create_all(bind=engine)
seed_exercises(SessionLocal())    