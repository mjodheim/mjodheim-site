"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/keystatic");
    } else {
      setError("Mot de passe incorrect.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#080402",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(181,101,29,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid rgba(201,168,76,0.25)",
          backgroundColor: "#0D0806",
          padding: "3rem 2.5rem",
          boxShadow: "0 0 60px rgba(201,168,76,0.06)",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(201,168,76,0.4)",
            margin: "0 auto 1.5rem",
            position: "relative",
          }}
        >
          <Image
            src="/images/logo-header.png"
            alt="Mjödheim"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.8rem",
            fontWeight: 600,
            color: "#C9A84C",
            marginBottom: "0.25rem",
          }}
        >
          Mjödheim
        </h1>
        <p
          style={{
            color: "rgba(245,230,204,0.4)",
            fontSize: "0.85rem",
            marginBottom: "2.5rem",
            letterSpacing: "0.08em",
          }}
        >
          Espace d&apos;administration
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            autoFocus
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201,168,76,0.2)",
              color: "#F5E6CC",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.1rem",
              outline: "none",
              marginBottom: "1rem",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p
              style={{
                color: "#E05A00",
                fontSize: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: "100%" }}
          >
            {loading ? "Vérification…" : "Entrer"}
          </button>
        </form>
      </div>
    </div>
  );
}
