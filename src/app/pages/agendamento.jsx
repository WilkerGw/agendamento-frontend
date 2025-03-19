"use client";

import { useState } from "react";
import "../globals.css";

export default function Agendamento() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    whatsapp: "",
    data: "03/04/2025", // Data fixa conforme requisito
    hora: "", // Horário selecionado pelo usuário
  });

  const [mensagem, setMensagem] = useState("");

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar os dados para a API
    const response = await fetch(
      "https://my-nodejs-backend-12643wne0-wilkergws-projects.vercel.app",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (response.ok) {
      setMensagem("Agendamento realizado com sucesso!");
    } else {
      setMensagem(`Erro: ${result.error}`);
    }
  };

  return (
    <div className="agendamento">
      <h1>Agendamento de Exame de Vista</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome Completo:
          <input
            type="text"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          WhatsApp:
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Data:
          <input
            type="text"
            name="data"
            value={formData.data}
            readOnly // Data fixa
          />
        </label>
        <br />
        <label>
          Hora:
          <select
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um horário</option>
            {/* Gerar horários de 10:30 às 17:15 */}
            {Array.from({ length: 8 }, (_, i) => {
              const hour = 10 + Math.floor(i / 2);
              const minute = i % 2 === 0 ? "30" : "00";
              return `${hour}:${minute}`;
            }).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Agendar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
