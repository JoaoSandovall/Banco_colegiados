from sqlalchemy import Column, Integer, String, Text
from database import Base

class Colegiado(Base):
    __tablename__ = "colegiados"

    id = Column(Integer, primary_key=True, index=True)
    nome_colegiado = Column(String, nullable=False)
    status_vigencia = Column(String, nullable=False)
    objeto_finaliade = Column(String)
    tipo_hierarquia = Column(String, nullable=False)
    tipo_composicao = Column(String, nullable=True)
    temas = Column(String, nullable=False)
    link_normativo = Column(String, nullable=False)
    coordenacao = Column(String, nullable=False)
    atuacao_midr = Column(String, nullable=False)
    numero_processo = Column(Integer)
    