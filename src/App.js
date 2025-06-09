import React, { useEffect, useState } from "react";

export default function EbookVendaPage() {
  const [countdown, setCountdown] = useState(3600);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    fetch("https://hooks.zapier.com/hooks/catch/SEU_WEBHOOK_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(() => setSubmitted(true))
      .catch(() => alert("Erro ao enviar email."));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-orange-100 text-gray-800">
      <div className="bg-red-600 text-white text-center p-3 font-bold text-lg animate-pulse">
        🚨 E-book gratuito disponível por tempo limitado: {formatTime(countdown)}
      </div>

      <header className="bg-gradient-to-r from-pink-600 to-red-500 text-white py-8 text-center shadow-md">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Domine o Inglês com 500 Palavras em Frases Reais (Grátis)
        </h1>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="text-center bg-white p-6 rounded-xl shadow-lg mb-8 border border-yellow-200">
          <h2 className="text-2xl font-semibold mb-3 text-orange-600">
            Baixe agora seu guia gratuito com 500 palavras essenciais explicadas em contexto real
          </h2>
          <p className="mb-6 text-gray-600">
            Para receber o e-book gratuitamente no seu e-mail, basta preencher o formulário abaixo. É rápido e prático!
          </p>
          <img
            src="https://i.imgur.com/wAV1mBS.png"
            alt="Capa do E-book"
            className="mx-auto mb-6 w-48 rounded-lg shadow-md transition-transform hover:scale-105"
          />
          {submitted ? (
            <p className="text-green-600 text-lg font-medium">✅ E-book enviado! Confira seu e-mail e aproveite o conteúdo!</p>
          ) : (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col gap-4 md:flex-row md:items-center justify-center"
            >
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 p-3 border-2 border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <button
                type="submit"
                className="bg-red-500 text-white py-3 px-6 rounded font-semibold text-lg hover:bg-red-600 transition shadow"
              >
                🔥 Enviar e Receber Agora
              </button>
            </form>
          )}
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
            <h3 className="font-bold text-red-600 mb-2 text-lg">
              🚀 Comece rápido
            </h3>
            <p className="text-sm text-gray-700">
              Ideal para quem quer começar a aprender inglês agora e precisa de vocabulário útil no dia a dia.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
            <h3 className="font-bold text-red-600 mb-2 text-lg">💡 Método claro</h3>
            <p className="text-sm text-gray-700">
              Cada palavra vem com uma frase real em inglês e a explicação traduzida com clareza.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
            <h3 className="font-bold text-red-600 mb-2 text-lg">📩 Material direto no seu e-mail</h3>
            <p className="text-sm text-gray-700">
              Sem enrolação. Informe o e-mail e receba o conteúdo automaticamente com nosso sistema.
            </p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg my-10 border border-yellow-100">
          <h2 className="text-xl font-bold text-red-600 mb-4">Quem sou eu?</h2>
          <p className="text-gray-700">
            Sou um entusiasta do inglês que já passou pela dificuldade de aprender sozinho. Criei este e-book com base em anos de prática, estudo e experiência real, para que você não precise mais estudar da forma errada.
          </p>
        </section>
      </main>

      <footer className="bg-red-600 text-white text-center py-4 mt-10 shadow-inner">
        <p>&copy; 2025 - Inglês com Contexto. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
