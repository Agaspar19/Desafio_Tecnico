# Desafio Técnico – Localização de Pontos de Conexão

Este projeto implementa uma aplicação simplificada para localizar pontos de conexão próximos a partir de coordenadas informadas pelo usuário.  
O foco é demonstrar **integração entre frontend, backend e banco de dados local**.

---

## Tecnologias Utilizadas

### Backend
- **Python 3.11+**
- **Flask** : para criação da API REST.
- **Flask-CORS** : permiti integração com o frontend.
- **SQLite3** : banco de dados local.
- **Haversine (cálculo)** → fórmula para medir distância entre coordenadas.

### 🔹 Frontend
- **React (Vite)** : construção da interface.
- **Leaflet** : mapa interativo.
- **OpenStreetMap Tiles** : exibição do mapa.
- **CSS** : estilização simples da aplicação.

---

## Como Rodar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/Agaspar19/desafio-tecnico.git
cd desafio-tecnico

---
### Baixar o arquivo zip.

2. Backend

Acesse a pasta:

cd Backend


Crie e ative o ambiente virtual:

python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate # Linux/Mac


Instale dependências:

pip install -r requirements.txt

Inicie o servidor Flask:

cd ../Backend
python app.py

. Frontend

Acesse a pasta:

cd ../Frontend


Instale dependências:

npm install


Execute o servidor:

npm run dev

OBS: rodar em terminais diferentes.
