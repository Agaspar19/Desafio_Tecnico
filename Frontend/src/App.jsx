import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,CircleMarker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({ onClickMap }) {
  useMapEvents({
    click(e) {
      onClickMap(e.latlng);
    },
  });
  return null;
}
export default function App() {
  const [pontos, setPontos] = useState([]);
  const [posicao, setPosicao] = useState({ lat: -28.933, lng: -49.495 });
  const [erro, setErro] = useState("");

  const buscarPontos = async (lat, lng) => {
    try {
      setErro("");
      const resp = await fetch(`http://127.0.0.1:5000/buscar?Latitude=${lat}&Longitude=${lng}`);
      if (!resp.ok) {
        throw new Error("Falha ao buscar pontos");
      }
      const dados = await resp.json();
      setPontos(dados);
      setPosicao({ lat, lng });
    } catch (err) {
      console.error(err);
      setErro("Não foi possível buscar os pontos. Tente novamente.");
      setPontos([]);
    }
  };
  const customIcon = L.icon({
      iconUrl: "/location.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32] 
    });
    
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Pontos próximos</h2>
        {erro && <p className="erro">{erro}</p>}
        {pontos.length === 0 && !erro && <p>Nenhum ponto encontrado.</p>}
        <ul>
          {pontos.map((p) => (
            <li key={p.Id}>
              <b>{p.Nome}</b>
                <br />Tecnologia: {p.Tecnologia}<br />
                   Distância: {p.distancia_km} km
            </li>
          ))}
        </ul>
      </div>
      {/* Mapa */}
      <div className="map">
        <MapContainer
          center={[posicao.lat, posicao.lng]}
          zoom={14}
          className="leaflet-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker onClickMap={({ lat, lng }) => buscarPontos(lat, lng)} />
            {pontos.map((p) => (
              <Marker
                key={p.Id}
                position={[p.Latitude, p.Longitude]}
                icon={customIcon}
              >
                <Popup>
                  <b>{p.Nome}</b> <br />
                  {p.Tecnologia} <br />
                  Distância: {p.distancia_km} km
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}


