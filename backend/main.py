from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import cast, String
from typing import List, Optional 
from database import get_db
from sqlalchemy.exc import IntegrityError
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

    if nomeColegiado:
        query = query.filter(models.Colegiado.nome_colegiado.ilike(f"%{nomeColegiado.strip()}%"))
    if coordenacao:
        query = query.filter(models.Colegiado.coordenacao.ilike(f"%{coordenacao.strip()}%"))
    if temas:
        query = query.filter(models.Colegiado.temas.ilike(f"%{temas.strip()}%"))
    if status and status.lower() != "todos":
        query = query.filter(models.Colegiado.status_vigencia.ilike(f"%{status.strip()}%"))
        
    if principalSub and principalSub.lower() != "todos":
        query = query.filter(models.Colegiado.principal_subcolegiado.ilike(f"%{principalSub.strip()}%"))
        
    if atuacaoMIDR and atuacaoMIDR.lower() != "todos":
        query = query.filter(models.Colegiado.atuacao_midr.ilike(f"%{atuacaoMIDR.strip()}%"))
        
    if internoMinisterial and internoMinisterial.lower() != "todos":
        query = query.filter(models.Colegiado.interno_interministerial.ilike(f"%{internoMinisterial.strip()}%"))        

    if filtroEtiquetas:
        query = query.filter(cast(models.Colegiado.tags, String).ilike(f"%{filtroEtiquetas.strip()}%"))

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

@app.post("/representantes/", response_model=schemas.Representante)
def criar_representante(representante: schemas.RepresentanteCreate, db: Session = Depends(get_db)):
    try:
        db_rep = models.Representante(**representante.dict())
        db.add(db_rep)
        db.commit()
        db.refresh(db_rep)
        return db_rep
    except IntegrityError:
        db.rollback() 
        raise HTTPException(status_code=400, detail="Já existe um representante cadastrado com este exato nome.")

@app.put("/representantes/{rep_id}", response_model=schemas.Representante)
def atualizar_representante(rep_id: int, representante: schemas.RepresentanteCreate, db: Session = Depends(get_db)):
    db_rep = db.query(models.Representante).filter(models.Representante.id == rep_id).first()
    if not db_rep:
        raise HTTPException(status_code=404, detail="Representante não encontrado")
    for key, value in representante.dict().items():
        setattr(db_rep, key, value)
    db.commit()
    db.refresh(db_rep)
    return db_rep

@app.get("/representantes/", response_model=List[schemas.Representante])
def listar_representantes(db: Session = Depends(get_db)):
    return db.query(models.Representante).all()

@app.delete("/colegiados/{colegiado_id}")
def deletar_colegiado(colegiado_id: int, db: Session = Depends(database.get_db)):
    db_colegiado = db.query(models.Colegiado).filter(models.Colegiado.id == colegiado_id).first()
    
    if not db_colegiado:
        raise HTTPException(status_code=404, detail="Colegiado não encontrado")
        
    db.delete(db_colegiado)
    db.commit()
    return {"message": "Colegiado excluído com sucesso"}

@app.post("/representacoes/", response_model=schemas.Representacao)
def criar_representacao(representacao: schemas.RepresentacaoCreate, db: Session = Depends(get_db)):
    db_representacao = models.Representacao(**representacao.dict())
    db.add(db_representacao)
    db.commit()
    db.refresh(db_representacao)
    return db_representacao

@app.get("/colegiados/{colegiado_id}/representacoes/", response_model=List[schemas.Representacao])
def listar_representacoes_por_colegiado(colegiado_id: int, db: Session = Depends(get_db)):
    return db.query(models.Representacao).filter(models.Representacao.colegiado_id == colegiado_id).all()

@app.get("/representacoes/", response_model=List[schemas.Representacao])
def listar_todas_representacoes(db: Session = Depends(get_db)):
    return db.query(models.Representacao).all()

@app.put("/representacoes/{vinc_id}", response_model=schemas.Representacao)
def atualizar_representacao(vinc_id: int, representacao: schemas.RepresentacaoCreate, db: Session = Depends(get_db)):
    db_vinc = db.query(models.Representacao).filter(models.Representacao.id == vinc_id).first()
    if not db_vinc:
        raise HTTPException(status_code=404, detail="Vínculo não encontrado")
    for key, value in representacao.dict().items():
        setattr(db_vinc, key, value)
    db.commit()
    db.refresh(db_vinc)
    return db_vinc