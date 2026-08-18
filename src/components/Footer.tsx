import { Link } from 'react-router-dom'
import { CONTACT, whatsappLink } from '../config/programme'
import { useI18n } from '../i18n'
import './footer.css'

export function Footer() {
  const { t } = useI18n()
  const f = t.footer
  return (
    <footer className="sitefooter">
      <div className="container sitefooter__grid">
        <div className="sitefooter__brand">
          <span className="sitefooter__wordmark">
            SPM<em>2</em>Diploma
          </span>
          <p className="sitefooter__signature">{f.signature}</p>
          <p className="sitefooter__powered">
            {f.poweredBy}{' '}
            <a className="kobislink" href={CONTACT.kobisUrl} target="_blank" rel="noopener noreferrer">
              KOBIS Berhad
            </a>
          </p>
          <p className="sitefooter__credit">
            {f.designedBy}{' '}
            <a className="kobislink" href={CONTACT.kobisUrl} target="_blank" rel="noopener noreferrer">
              KOBIS Berhad
            </a>
            <span className="sitefooter__creditsep" aria-hidden="true">·</span>
            <a className="kobislink sitefooter__crediturl" href={CONTACT.kobisUrl} target="_blank" rel="noopener noreferrer">
              www.kobisberhad.com
            </a>
          </p>
        </div>

        <nav className="sitefooter__col" aria-label={f.publicTitle}>
          <h3>{f.publicTitle}</h3>
          <Link to="/#laluan">{f.publicLinks.pathways}</Link>
          <Link to="/#perjalanan">{f.publicLinks.journey}</Link>
          <Link to="/#coach">{f.publicLinks.coach}</Link>
          <Link to="/#faq">{f.publicLinks.faq}</Link>
          <Link to="/semakan">{f.publicLinks.semak}</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            {f.publicLinks.contact}
          </a>
          <Link to="/privasi">{f.publicLinks.privacy}</Link>
          <Link to="/maklumat-program">{f.publicLinks.programInfo}</Link>
        </nav>

        <nav className="sitefooter__col" aria-label={f.supportTitle}>
          <h3>{f.supportTitle}</h3>
          <Link to="/login">{f.participantLogin}</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            {f.whatsappSupport}
          </a>
        </nav>
      </div>

      <div className="container sitefooter__bottom">
        <p>{f.copyright}</p>
        <nav className="sitefooter__internal" aria-label={f.internalTitle}>
          <Link to="/team">{f.teamAccess}</Link>
          <span aria-hidden="true">·</span>
          <Link to="/pengurusan">{f.managementAccess}</Link>
        </nav>
      </div>
    </footer>
  )
}
