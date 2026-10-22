"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, Star, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { useApp } from "./provider";
import { professionals } from "@/data/professionals";
import { categories, projectTypes, locations } from "@/data/categories";
export function Modals() {
  const { modal, closeModal, t, locale } = useApp();
  return modal ? (
    <Modal key={`${modal.type}-${modal.id || ""}`} onClose={closeModal} />
  ) : null;
}
function Modal({ onClose }: { onClose: () => void }) {
  const { modal, t, locale, openModal } = useApp();
  const dialog = useRef<HTMLDialogElement>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(""); // TODO: Replace session-only chat messages with authenticated realtime delivery.
  const [messages, setMessages] = useState<{ text: string; mine: boolean }[]>(
    [],
  );
  const [ratings, setRatings] = useState([5, 5, 5, 5]);
  const [error, setError] = useState("");
  useEffect(() => {
    const d = dialog.current;
    d?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      d?.close();
      document.body.style.overflow = before;
    };
  }, []);
  if (!modal) return null;
  const p = professionals.find((p) => p.id === modal.id);
  const titles: Record<string, string> = {
    login: t("login"),
    register: t("register"),
    project: t("projectTitle"),
    chat: p?.name[locale] || t("chat"),
    review: t("leaveReview"),
    info: modal.title || "",
    image: modal.title || t("portfolio"),
    plan: t("pricing"),
    certificate: t("education"),
    projectDetail: modal.title || t("projectDetails"),
  };
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setError("");
    // TODO: Replace local demo adapters with backend auth, project and review APIs.
    // TODO: Connect plan selection to a payment provider after backend authentication.
    if (modal?.type === "project") {
      try {
        const existing = JSON.parse(
          localStorage.getItem("sheneba-projects") || "[]",
        );
        localStorage.setItem(
          "sheneba-projects",
          JSON.stringify([
            ...existing,
            {
              ...Object.fromEntries(data),
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ]),
        );
      } catch {
        setError(t("required"));
        return;
      }
    }
    if (modal?.type === "review" && p) {
      const r = {
        id: crypto.randomUUID(),
        reviewer: {
          ka: String(data.get("name")),
          en: String(data.get("name")),
        },
        rating: ratings.reduce((a, b) => a + b, 0) / 4,
        breakdown: {
          communication: ratings[0],
          quality: ratings[1],
          deadlines: ratings[2],
          value: ratings[3],
        },
        comment: {
          ka: String(data.get("comment")),
          en: String(data.get("comment")),
        },
        date: new Date().toISOString().slice(0, 10),
      };
      window.dispatchEvent(
        new CustomEvent("sheneba-review", {
          detail: { professionalId: p.id, review: r },
        }),
      );
    }
    setSuccess(true);
  }
  return (
    <dialog
      ref={dialog}
      className={`modal ${modal.type === "image" ? "image-modal" : ""}`}
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-heading">
        <h2 id="modal-title">{titles[modal.type]}</h2>
        <button
          className="icon-button"
          aria-label={t("close")}
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      {modal.type === "image" ? (
        <img
          className="lightbox-image"
          src={modal.image}
          alt={modal.title || ""}
        />
      ) : modal.type === "chat" ? (
        <>
          <p className="notice">{t("chatNotice")}</p>
          <div className="chat-messages" aria-live="polite">
            <div className="chat-welcome">
              <MessageCircle size={35} />
              <p>{t("projectTitle")}</p>
            </div>
            {messages.map((m, i) => (
              <p
                key={i}
                className={m.mine ? "chat-bubble mine" : "chat-bubble"}
              >
                {m.text}
              </p>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!message.trim()) return;
              setMessages((prev) => [
                ...prev,
                { text: message.trim(), mine: true },
                { text: t("chatReply"), mine: false },
              ]);
              setMessage("");
            }}
          >
            <input
              aria-label={t("message")}
              placeholder={t("message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button className="button" aria-label={t("send")}>
              <Send size={18} />
            </button>
          </form>
        </>
      ) : success ? (
        <div className="success-message" role="status">
          <CheckCircle2 size={48} />
          <h3>
            {t(
              modal.type === "project"
                ? "projectSuccess"
                : modal.type === "review"
                  ? "reviewSuccess"
                  : "authSuccess",
            )}
          </h3>
          <button className="button" onClick={onClose}>
            {t("close")}
          </button>
        </div>
      ) : modal.type === "login" || modal.type === "register" ? (
        <form onSubmit={submit} className="modal-form">
          <p>{t("authTitle")}</p>
          <p className="notice">{t("authNotice")}</p>
          {modal.type === "register" && (
            <label>
              {t("reviewer")}
              <input name="name" required autoComplete="name" />
            </label>
          )}
          <label>
            {t("email")}
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            {t("password")}
            <input
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete={
                modal.type === "login" ? "current-password" : "new-password"
              }
            />
          </label>
          <button className="button">{t("continue")}</button>
          <p className="switch-auth">
            {t(modal.type === "login" ? "noAccount" : "haveAccount")}{" "}
            <button
              type="button"
              onClick={() =>
                openModal({
                  type: modal.type === "login" ? "register" : "login",
                })
              }
            >
              {t(modal.type === "login" ? "register" : "login")}
            </button>
          </p>
        </form>
      ) : modal.type === "project" ? (
        <form className="modal-form" onSubmit={submit}>
          <p className="notice">{t("demo")}</p>
          <label>
            {t("projectName")}
            <input name="title" required />
          </label>
          <div className="form-row">
            <label>
              {t("need")}
              <select name="category">
                {categories.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.profession[locale]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t("projectType")}
              <select name="type">
                {projectTypes.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.name[locale]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              {t("location")}
              <select name="location">
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name[locale]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t("budget")}
              <input name="budget" type="number" min="0" required />
            </label>
          </div>
          <label>
            {t("description")}
            <textarea name="description" rows={4} required />
          </label>
          <p role="alert">{error}</p>
          <button className="button">{t("sendProject")}</button>
        </form>
      ) : modal.type === "review" ? (
        <form className="modal-form" onSubmit={submit}>
          <label>
            {t("reviewer")}
            <input name="name" required />
          </label>
          {["communication", "quality", "deadlines", "value"].map((key, i) => (
            <div className="rating-input" key={key}>
              <span>{t(key)}</span>
              <div role="radiogroup" aria-label={t(key)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={ratings[i] === n}
                    aria-label={`${n} / 5`}
                    onClick={() =>
                      setRatings((prev) =>
                        prev.map((v, j) => (i === j ? n : v)),
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const next = Math.min(
                          5,
                          Math.max(1, n + (e.key === "ArrowRight" ? 1 : -1)),
                        );
                        setRatings((prev) =>
                          prev.map((v, j) => (i === j ? next : v)),
                        );
                        (
                          e.currentTarget.parentElement?.children[
                            next - 1
                          ] as HTMLButtonElement
                        )?.focus();
                      }
                    }}
                    tabIndex={ratings[i] === n ? 0 : -1}
                  >
                    <Star
                      size={24}
                      fill={n <= ratings[i] ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
          <label>
            {t("comment")}
            <textarea name="comment" rows={4} required />
          </label>
          <button className="button">{t("submitReview")}</button>
        </form>
      ) : modal.type === "projectDetail" ? (
        <>
          <img
            className="detail-image"
            src={modal.image}
            alt={modal.title || ""}
          />
          <p>{t("projectDemo")}</p>
          <button
            className="button"
            onClick={() => openModal({ type: "chat", id: modal.id })}
          >
            {t("openChat")}
          </button>
        </>
      ) : (
        <div className="info-content">
          <p>
            {modal.type === "plan"
              ? t("planNotice", { plan: modal.title || "PRO" })
              : modal.text || t("certificateDetail")}
          </p>
          {modal.type === "plan" && (
            <button
              className="button"
              onClick={() => openModal({ type: "register" })}
            >
              {t("register")}
            </button>
          )}
        </div>
      )}
    </dialog>
  );
}
