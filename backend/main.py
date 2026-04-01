from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, database

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

@app.get("/colegiados")
def listar_colegiados(db: Session = Depends(database.get_db)):
    return db.query(models.Colegiado).all()
@app.post("/colegiados")
def criar_colegiado(colegiado:dict, db: Session = Depends(database.get_db)):
    db_colegiado = models.Colegiado(**colegiado)
    db.add(db_colegiado)
    db.commit()
    db.refresh(db_colegiado)
    return db_colegiado

@app.get("/representantes")
def listar_representantes(db: Session = Depends(database.get_db)):
    return []