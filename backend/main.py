from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, String
from typing import List, Optional 
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

@app.get("/colegiados", response_model=List[schemas.Colegiado])
def get_colegiados(
    ambito: Optional[str] = Query(None),
    atuacao: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Colegiado)
    
    if ambito:
        query = query.filter(models.Colegiado.ambito == ambito)
    if atuacao:
        query = query.filter(models.Colegiado.atuacao == atuacao)
    if status:
        query = query.filter(models.Colegiado.status == status)
        
    return query.all()

@app.get("/colegiados/")
def listar_colegiados(
    nomeColegiado: Optional[str] = None,
    coordenacao: Optional[str] = None,
    temas: Optional[str] = None,
    status: Optional[str] = None,
    principalSub: Optional[str] = None,
    atuacaoMIDR: Optional[str] = None,
    internoMinisterial: Optional[str] = None,
    filtroEtiquetas: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Colegiado)

    print(f"--- FILTRO DE ETIQUETA RECEBIDO: {filtroEtiquetas} ---")

    if nomeColegiado:
        query = query.filter(models.Colegiado.nome_colegiado.ilike(f"%{nomeColegiado}%"))
    if coordenacao:
        query = query.filter(models.Colegiado.coordenacao.ilike(f"%{coordenacao}%"))
    if temas:
        query = query.filter(models.Colegiado.temas.ilike(f"%{temas}%"))
    
    if status and status != "todos":
        query = query.filter(func.lower(models.Colegiado.status_vigencia) == status.lower())
    if principalSub and principalSub != "todos":
        query = query.filter(func.lower(models.Colegiado.principal_subcolegiado) == principalSub.lower())
    if atuacaoMIDR and atuacaoMIDR != "todos":
        query = query.filter(func.lower(models.Colegiado.atuacao_midr) == atuacaoMIDR.lower())
    if internoMinisterial and internoMinisterial != "todos":
        query = query.filter(func.lower(models.Colegiado.interno_interministerial) == internoMinisterial.lower())        
    if filtroEtiquetas:
        query = query.filter(cast(models.Colegiado.tags, String).ilike(f"%{filtroEtiquetas}%"))

    return query.all()

@app.post("/colegiados/")
def create_colegiado(colegiado: schemas.ColegiadoBase, db: Session = Depends(get_db)):
    from sqlalchemy import func
    
    db_existente = db.query(models.Colegiado).filter(
        func.lower(models.Colegiado.nome_colegiado) == func.lower(colegiado.nome_colegiado)
    ).first()
    
    if db_existente:
        raise HTTPException(status_code=400, detail="Colegiado já existente")

    if colegiado.principal_subcolegiado == "Principal":
        colegiado.subcolegiado_ligado_ao = None
    
    db_colegiado = models.Colegiado(**colegiado.model_dump())
    
    db.add(db_colegiado)
    db.commit()
    db.refresh(db_colegiado)
    return db_colegiado

@app.put("/colegiados/{colegiado_id}", response_model=schemas.ColegiadoBase)
def atualizar_colegiado(colegiado_id: int, colegiado: schemas.ColegiadoBase, db: Session = Depends(database.get_db)):
    from sqlalchemy import func
    
    db_colegiado = db.query(models.Colegiado).filter(models.Colegiado.id == colegiado_id).first()
    if not db_colegiado:
        raise HTTPException(status_code=404, detail="Colegiado not found")
    
    if colegiado.nome_colegiado.strip().lower() != db_colegiado.nome_colegiado.strip().lower():
        db_existente = db.query(models.Colegiado).filter(
            func.lower(models.Colegiado.nome_colegiado) == func.lower(colegiado.nome_colegiado)
        ).first()
        if db_existente:
            raise HTTPException(status_code=400, detail="Colegiado já existente")
    
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

@app.delete("/colegiados/{colegiado_id}")
def deletar_colegiado(colegiado_id: int, db: Session = Depends(database.get_db)):
    db_colegiado = db.query(models.Colegiado).filter(models.Colegiado.id == colegiado_id).first()
    
    if not db_colegiado:
        raise HTTPException(status_code=404, detail="Colegiado não encontrado")
        
    db.delete(db_colegiado)
    db.commit()
    return {"message": "Colegiado excluído com sucesso"}