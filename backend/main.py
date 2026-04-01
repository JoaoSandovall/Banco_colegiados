from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models, schemas, database

app = FastAPI(title="Sistema de Gestão de Colegiados - MIDR")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

@app.get("/colegiados", response_model=List[schemas.Colegiado])
def listar_colegiados(db: Session = Depends(database.get_db)):
    return db.query(models.Colegiado).all()

@app.post("/colegiados", response_model=schemas.Colegiado)
def criar_colegiado(colegiado: schemas.ColegiadoCreate, db: Session = Depends(database.get_db)):
    db_colegiado = models.Colegiado(**colegiado.model_dump())
    db.add(db_colegiado)
    db.commit()
    db.refresh(db_colegiado)
    return db_colegiado

@app.get("/representantes", response_model=List[schemas.Representante])
def listar_representantes(db: Session = Depends(database.get_db)):
    return db.query(models.Representante).all()

@app.post("/representantes", response_model=schemas.Representante)
def criar_representante(representante: schemas.RepresentanteCreate, db: Session = Depends(database.get_db)):
    db_representante = models.Representante(**representante.model_dump())
    db.add(db_representante)
    db.commit()
    db.refresh(db_representante)
    return db_representante