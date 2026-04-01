from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
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
    representantes = relationship("Representante", back_populates="colegiado_rel")

class Representantes(Base):
    __tablename__ = "representantes"

    id = Column(Integer, primary_key=True, index=True)
    colegiado_id = Column(Integer, ForeignKey("colegiados.id"))
    nome_colegiado_txt = Column(String)
    representante_nome = Column(String, nullable=False)
    tipo_representacao = Column(String)
    cargo_representante = Column(String)
    secretaria_representante = Column(String)
    sigla_secretaria = Column(String)
    ato_indicacao = Column(String)
    link_portaria = Column(String)
    data_ato_indicacao = Column(Date, nullable=True)
    numero_processo_rep = Column(String)
    colegiado_rel = relationship("Colegiado", back_populates="representantes")