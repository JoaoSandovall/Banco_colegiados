from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import get_db
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

@app.get("/colegiados/")
def listar_colegiados(db: Session = Depends(get_db)):
    colegiados = db.query(models.Colegiado).all()
    return colegiados

@app.post("/colegiados/")
def create_colegiado(colegiado: schemas.ColegiadoBase, db: Session = Depends(get_db)):
    
    if colegiado.principal_subcolegiado == "Principal":
        colegiado.subcolegiado_ligado_ao = None
    
    db_colegiado = models.Colegiado(**colegiado.model_dump())
    
    db.add(db_colegiado)
    db.commit()
    db.refresh(db_colegiado)
    return db_colegiado

@app.put("/colegiados/{colegiado_id}", response_model=schemas.ColegiadoBase)
def atualizar_colegiado(colegiado_id: int, colegiado: schemas.ColegiadoBase, db: Session = Depends(database.get_db)):
    db_colegiado = db.query(models.Colegiado).filter(models.Colegiado.id == colegiado_id).first()
    if not db_colegiado:
        raise HTTPException(status_code=404, detail="Colegiado not found")
    for key, value in colegiado.model_dump().items():
        setattr(db_colegiado, key, value)
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