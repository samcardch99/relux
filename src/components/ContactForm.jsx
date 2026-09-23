import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { COPY } from "../data/copy.ts";

/** Service <option> values stay in English so the delivered email reads the
 *  same whichever language the visitor used; only the label is translated. */
const SERVICE_KEYS = ["s1Title", "s2Title", "s3Title", "s4Title"];

export default function ContactForm() {
  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const [lang, setLang] = useState("en");
  const [sent, setSent] = useState(false);

  // Follow the site-wide language toggle (see src/scripts/site.ts)
  useEffect(() => {
    const read = () =>
      setLang(document.documentElement.lang === "es" ? "es" : "en");
    read();
    const onLang = (e) => setLang(e.detail?.lang === "es" ? "es" : "en");
    window.addEventListener("relux:lang", onLang);
    return () => window.removeEventListener("relux:lang", onLang);
  }, []);

  const t = COPY[lang] ?? COPY.en;

  const formSchema = useMemo(
    () =>
      z.object({
        first_name: z.string().min(2, t.errFirst),
        last_name: z.string().min(2, t.errLast),
        email: z.string().email(t.errEmail),
        service: z.string().min(1, t.errService),
        message: z.string().min(10, t.errMessage),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      service: "",
      message: "",
    },
    mode: "onSubmit",
  });

  // Grow the message field with its content, up to four lines
  const messageValue = watch("message");
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxHeight = 24 * 4;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [messageValue]);

  const onSubmit = async () => {
    if (!formRef.current) return;
    try {
      await emailjs.sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY }
      );
      toast.success(t.sentTitle, { description: t.sentDesc });
      setSent(true);
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(t.errTitle, { description: t.errDesc });
    }
  };

  const { ref: registerMessageRef, ...messageProps } = register("message");

  const submitLabel = isSubmitting ? t.sending : sent ? t.sent : t.send;

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <div className="form__row">
          <label className="field">
            <span className="field-label">{t.labelFirst}</span>
            <input
              {...register("first_name")}
              type="text"
              placeholder={t.phFirst}
              className="input"
              autoComplete="given-name"
            />
            {errors.first_name && (
              <span className="field__error">{errors.first_name.message}</span>
            )}
          </label>

          <label className="field">
            <span className="field-label">{t.labelLast}</span>
            <input
              {...register("last_name")}
              type="text"
              placeholder={t.phLast}
              className="input"
              autoComplete="family-name"
            />
            {errors.last_name && (
              <span className="field__error">{errors.last_name.message}</span>
            )}
          </label>
        </div>

        <label className="field">
          <span className="field-label">{t.labelEmail}</span>
          <input
            {...register("email")}
            type="email"
            placeholder={t.phEmail}
            className="input"
            autoComplete="email"
          />
          {errors.email && (
            <span className="field__error">{errors.email.message}</span>
          )}
        </label>

        <label className="field">
          <span className="field-label">{t.labelService}</span>
          <select {...register("service")} className="input input--select" defaultValue="">
            <option value="" disabled>
              {t.phService}
            </option>
            {SERVICE_KEYS.map((key) => (
              <option key={key} value={COPY.en[key]}>
                {t[key]}
              </option>
            ))}
          </select>
          {errors.service && (
            <span className="field__error">{errors.service.message}</span>
          )}
        </label>

        <label className="field">
          <span className="field-label">{t.labelMessage}</span>
          <textarea
            {...messageProps}
            ref={(el) => {
              registerMessageRef(el);
              textareaRef.current = el;
            }}
            rows={3}
            placeholder={t.phMessage}
            className="input input--area"
          />
          {errors.message && (
            <span className="field__error">{errors.message.message}</span>
          )}
        </label>

        <button type="submit" className="btn btn--solid form__submit" disabled={isSubmitting}>
          <span>{submitLabel}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </button>
      </form>
    </>
  );
}
