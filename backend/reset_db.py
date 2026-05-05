from database import engine
import models

print("Limpando tabelas antigas no PostgreSQL...")
models.Base.metadata.drop_all(bind=engine)

print("Recriando tabelas com a nova estrutura...")
models.Base.metadata.create_all(bind=engine)

print("Banco de dados atualizado com sucesso!")