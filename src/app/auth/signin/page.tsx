'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getProviders, signIn, type ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import styles from './signin.module.css';

export default function StaffSignIn() {
  const [providers, setProviders] = useState<ClientSafeProvider[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('/admin');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('callbackUrl');
    if (target) {
      try {
        const url = new URL(target, window.location.origin);
        if (url.origin === window.location.origin) setCallbackUrl(url.href);
      } catch { /* Keep the default destination for invalid URLs. */ }
    }
    if (params.has('error')) setError('Unable to sign in. Please check your details and try again.');
    getProviders().then((available) => {
      if (!available) throw new Error('Providers unavailable');
      setProviders(Object.values(available));
    }).catch(() => setError('Sign-in is temporarily unavailable. Please refresh to try again.'));
  }, []);

  async function connect(provider: ClientSafeProvider) {
    setBusy(provider.id);
    setError('');
    try { await signIn(provider.id, { callbackUrl }); }
    catch { setError('Unable to connect. Please try again.'); setBusy(null); }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="Spero home">SPERO</Link>
        <Link href="/" className={styles.back}><FiArrowLeft aria-hidden="true" /> Back to shop</Link>
      </header>
      <section className={styles.panel} aria-labelledby="signin-title">
        <Image src="/images/logo.png" alt="" width={64} height={64} className={styles.bird} priority />
        <h1 id="signin-title">Staff Login</h1>
        <p className={styles.intro}>Welcome back to Spero.</p>
        <div className={styles.actions} aria-busy={!!busy || !providers}>
          {!providers && !error && <p role="status" className={styles.status}>Preparing sign-in…</p>}
          {providers?.filter((provider) => provider.id === 'google').map((provider) => (
            <button key={provider.id} className={styles.oauth} disabled={!!busy} onClick={() => connect(provider)}>
              {provider.id === 'google' && <FcGoogle size={22} aria-hidden="true" />}
              {busy === provider.id ? 'Connecting…' : `Sign in with ${provider.name}`}
              <FiArrowRight aria-hidden="true" />
            </button>
          ))}
          {error && <p role="alert" id="signin-error" className={styles.error}>{error}</p>}
        </div>
        <p className={styles.note}>For the Spero team.</p>
      </section>
      <footer className={styles.footer}>SPERO <span aria-hidden="true">/</span> STAFF ACCESS</footer>
    </main>
  );
}
