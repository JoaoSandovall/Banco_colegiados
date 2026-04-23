from pydantic import BaseModel, field_validator, model_validator
from typing import Optional, List,  Dict, Any
from enum import Enum

class StatusVigencia(str, Enum):
    ativo = "Ativo"
    inativo = "Inativo"

class TipoColegiado(str, Enum):
    principal = "Principal"
    subcolegiado = "Subcolegiado"

class AmbitoColegiado(str, Enum):
    interno = "Interno"
    interministerial = "Interministerial"

class AtuacaoMIDR(str, Enum):
    preside = "Preside"
    coordena = "Coordena"
    participa = "Participa"

class ColegiadoBase(BaseModel):
    model_config = {"use_enum_values": True}

    nome_colegiado: str
    status_vigencia: StatusVigencia
    objeto_finalidade: str
    principal_subcolegiado: TipoColegiado
    interno_interministerial: AmbitoColegiado
    temas: str
    link_normativo: Optional[str] = None
    coordenacao: str
    atuacao_midr: AtuacaoMIDR 
    numero_processo: Optional[str] = None
    subcolegiado_ligado_ao: Optional[str] = None
    tags: Optional[List[Dict[str, Any]]] = []
    
    @model_validator(mode='after')
    def check_hierarquia_principal(self):
        tem_ligacao = self.subcolegiado_ligado_ao and self.subcolegiado_ligado_ao.strip() != ""
        
        if self.principal_subcolegiado == "Principal" and tem_ligacao:
            raise ValueError('Um colegiado principal não pode estar ligado a outro.')
        return self

    @field_validator('nome_colegiado', 'objeto_finalidade', 'temas', 'coordenacao')
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        if not v or v.strip() == "":
            raise ValueError('Este campo não pode ser vazio')
        return v

class RepresentanteBase(BaseModel):
    nome: str

class RepresentanteCreate(RepresentanteBase):
    pass

class Representante(RepresentanteBase):
    id: int

    class Config:
        from_attributes = True

class Colegiado(ColegiadoBase):
    id: int

    class Config:
        from_attributes = True