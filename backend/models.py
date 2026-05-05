from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base

class Colegiado(Base):
    __tablename__ = "colegiados"

    id = Column(Integer, primary_key=True, index=True)
    nome_colegiado = Column(String, nullable=False)
    status_vigencia = Column(String)
    objeto_finalidade = Column(Text)
    principal_subcolegiado = Column(String)
    interno_interministerial = Column(String) 
    temas = Column(String)
    link_normativo = Column(String)
    coordenacao = Column(String)
    atuacao_midr = Column(String)
    numero_processo = Column(String)
    subcolegiado_ligado_ao = Column(String, nullable=True)
    tags = Column(JSON, default=list)
    
    representacoes = relationship("Representacao", back_populates="colegiado", cascade="all, delete-orphan")

class Representante(Base):
    __tablename__ = "representantes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, index=True, nullable=False) 
    cargo = Column(String, nullable=True)
    secretaria = Column(String, nullable=False)
    sigla_secretaria = Column(String, nullable=False)
    departamento = Column(String, nullable=True)
    sigla_departamento = Column(String, nullable=True)
    cce_fce = Column(String, nullable=True)

    representacoes = relationship("Representacao", back_populates="representante", cascade="all, delete-orphan")

class Representacao(Base):
    __tablename__ = "representacoes"

    id = Column(Integer, primary_key=True, index=True)
    colegiado_id = Column(Integer, ForeignKey("colegiados.id"), nullable=False)
    representante_id = Column(Integer, ForeignKey("representantes.id"), nullable=False)
    status = Column(String, nullable=False) 
    tipo_representacao = Column(String, nullable=False) 
    data_ato_indicacao = Column(String, nullable=False)
    ato_indicacao = Column(String, nullable=True)
    link_portaria = Column(String, nullable=True)
    numero_processo = Column(String, nullable=True)
    data_expiracao = Column(String, nullable=True)

    colegiado = relationship("Colegiado", back_populates="representacoes")
    representante = relationship("Representante", back_populates="representacoes")