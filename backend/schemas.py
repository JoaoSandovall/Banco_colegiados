from pydantic import BaseModel, Field, field_validator, model_validator, ConfigDict
from typing import Optional, List, Dict, Any
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
    model_config = ConfigDict(use_enum_values=True)

    nome_colegiado: str
    status_vigencia: StatusVigencia
    objeto_finalidade: str
    principal_subcolegiado: TipoColegiado
    interno_interministerial: AmbitoColegiado
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

    @field_validator('nome_colegiado', 'objeto_finalidade', 'coordenacao')
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        if not v or v.strip() == "":
            raise ValueError('Este campo não pode ser vazio')
        return v

class ColegiadoCreate(ColegiadoBase):
    pass

class Colegiado(ColegiadoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class RepresentanteBase(BaseModel):
    nome: str
    secretaria: str
    sigla_secretaria: str
    cargo: Optional[str] = None
    departamento: Optional[str] = None
    sigla_departamento: Optional[str] = None
    cce_fce: Optional[str] = None
    status: Optional[str] = "Ativo"

class RepresentanteCreate(RepresentanteBase):
    pass

class Representante(RepresentanteBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)


class RepresentacaoBase(BaseModel):
    colegiado_id: int
    representante_id: int
    status: str = Field(..., description="ativo, inativo, exonerado, ou em estruturação")
    tipo_representacao: str = Field(..., description="Titular, Suplente, ou Ponto focal")
    data_ato_indicacao: str
    ato_indicacao: Optional[str] = None
    link_portaria: Optional[str] = None
    numero_processo: Optional[str] = None
    data_expiracao: Optional[str] = None

class RepresentacaoCreate(RepresentacaoBase):
    pass

class Representacao(RepresentacaoBase):
    id: int
    representante: Representante
    
    model_config = ConfigDict(from_attributes=True)