import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-screen shrink-0 overflow-y-auto bg-white text-neutral-900'

const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID
const formspreeEndpoint = formspreeId
  ? `https://formspree.io/f/${formspreeId}`
  : null

const githubUrl =
  import.meta.env.VITE_GITHUB_URL ?? 'https://github.com/yourusername'
const linkedinUrl =
  import.meta.env.VITE_LINKEDIN_URL ?? 'https://www.linkedin.com/in/yourprofile'
const mailto =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'mailto:hello@example.com'

const socialLinkClass =
  'flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-400 hover:bg-white'

export default function Contact() {
  const { sectionFade, buttonMotion } = usePortfolioMotion()
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', message: '' } })

  const onSubmit = async (data) => {
    setSuccess(false)
    setSubmitError('')
    if (!formspreeEndpoint) {
      setSubmitError(
        'Add your Formspree form ID: create a form at formspree.io, then set VITE_FORMSPREE_FORM_ID in .env (see .env.example).',
      )
      return
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })

      const body = await res.json().catch(() => ({}))

      if (res.ok) {
        setSuccess(true)
        reset()
        return
      }

      setSubmitError(
        typeof body.error === 'string'
          ? body.error
          : 'Submission failed. Check your Formspree form ID and try again.',
      )
    } catch {
      setSubmitError('Network error. Check your connection and try again.')
    }
  }

  return (
    <section className={panelClass}>
      <motion.div
        className="mx-auto grid max-w-5xl gap-12 px-6 py-14 pb-32 md:grid-cols-2 md:py-16"
        {...sectionFade}
      >
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Contact
          </h2>
          <p className="mt-2 text-neutral-600">
            Send a message — I&apos;ll get back to you as soon as I can.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className={socialLinkClass}
            >
              <Github className="h-5 w-5 shrink-0" aria-hidden />
              GitHub
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={socialLinkClass}
            >
              <Linkedin className="h-5 w-5 shrink-0" aria-hidden />
              LinkedIn
            </a>
            <a href={mailto} className={socialLinkClass}>
              <Mail className="h-5 w-5 shrink-0" aria-hidden />
              Email
            </a>
          </div>
        </div>

        <div>
          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-neutral-300 bg-neutral-100 p-6 text-neutral-900"
              role="status"
            >
              <p>Thanks — your message was sent. I&apos;ll reply soon.</p>
              <button
                type="button"
                className="mt-4 text-sm font-medium text-black underline decoration-neutral-400 underline-offset-4 hover:decoration-black"
                onClick={() => setSuccess(false)}
              >
                Send another message
              </button>
            </motion.div>
          ) : null}

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Name"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-invalid={errors.name ? 'true' : 'false'}
                {...register('name', { required: 'Please enter your name.' })}
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-invalid={errors.email ? 'true' : 'false'}
                {...register('email', {
                  required: 'Please enter your email.',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Enter a valid email address.',
                  },
                })}
              />
              {errors.email ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Message"
                className="w-full resize-y rounded-xl border border-neutral-300 bg-white px-4 py-3 text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
                aria-invalid={errors.message ? 'true' : 'false'}
                {...register('message', {
                  required: 'Please enter a message.',
                })}
              />
              {errors.message ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {errors.message.message}
                </p>
              ) : null}
            </div>

            {submitError ? (
              <p className="text-sm text-red-700" role="alert">
                {submitError}
              </p>
            ) : null}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex cursor-pointer justify-center rounded-full border-0 bg-black px-8 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              {...buttonMotion}
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
