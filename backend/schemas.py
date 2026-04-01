from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import date

class ColegiadoBase(BaseModel):
    nome_colegiado: str
    status_vigencia: Optional[str] = None
    objeto_finalidade: Optional[str] = None
    principal_subcolegiado: Optional[str] = None
    interno_interministerial: Optional[str] = None
    temas: Optional[str] = None
    link_normativo: Optional[str] = None
    coordenacao: Optional[str] = None
    atuacao_midr: Optional[str] = None
    numero_processo: Optional[str] = None
    subcolegiado_ligado_ao: Optional[str] = None

class ColegiadoCreate(ColegiadoBase):
    pass

class Colegiado(ColegiadoBase):
    id: int

    class Config:
        from_attributes = True

class RepresentanteBase(BaseModel):
    nome_colegiado_txt: Optional[str] = None
    representante_nome: str
    tipo_representacao: Optional[str] = None
    cargo_representante: Optional[str] = None
    secretaria_representante: Optional[str] = None
    sigla_secretaria: Optional[str] = None
    ato_indicacao: Optional[str] = None
    link_portaria: Optional[str] = None
    data_ato_indicacao: Optional[date] = None
    numero_processo_rep: Optional[str] = None
    colegiado_id: Optional[int] = None

class RepresentanteCreate(RepresentanteBase):
    pass

class Representante(RepresentanteBase):
    id: int

    class Config:
        from_attributes = True