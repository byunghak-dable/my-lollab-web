import { html } from 'lit'

export const getPositionImg = (position: RiotPosition) => {
  switch (position) {
    case 'TOP':
      return html`
        <svg class="svg-position" viewBox="0 0 24 24">
          <path class="svg-position__path--line" d="M16.172 5H5v11.172l-3 3V2h17.172l-3 3z" fill="var(--primary)"></path>
          <path class="svg-position__path--other" d="M22 22H4.828l3-3H19V7.828l3-3V22zM15 9H9v6h6V9z" fill="#e5e3e0"></path>
        </svg>
      `
    case 'JGL':
      return html`
        <svg class="svg-position" viewBox="0 0 24 24">
          <path
            class="svg-position__path--line"
            d="M5.094 0c9.247 11.173 8.508 20.655 6.983 24-3.853-4.623-6.261-6.368-6.983-6.662C4.708 10.788 2.204 7.652 1 6.903c4.752 1.734 6.903 5.512 7.385 7.184C9.09 8.532 6.485 2.381 5.094 0zM15.569 18.22v2.57l3.451-3.452c0-5.651 2.622-9.311 3.933-10.435-4.816 2.312-6.93 8.508-7.384 11.318zM15.569 12.04l-.803 2.248C14.509 12.49 13.482 10.38 13 9.552 14.605 5.763 17.522 1.605 18.78 0c-2.505 5.137-3.185 10.167-3.211 12.04z"
            fill="var(--primary)"
          ></path>
        </svg>
      `
    case 'MID':
      return html`
        <svg class="svg-position" viewBox="0 0 24 24">
          <path class="svg-position__path--line" d="M22 2h-2.906L2 19.094V22h3.063L22 5.062V2z" fill="var(--primary)"></path>
          <path class="svg-position__path--other" d="M5 13.478l-3 3V2h14.478l-3 3H5v8.478zM19 10.819l3-3V22H7.82l3-3H19v-8.181z" fill="#e5e3e0"></path>
        </svg>
      `
    case 'BOT':
      return html`
        <svg class="svg-position" viewBox="0 0 24 24">
          <path class="svg-position__path--line" d="M7.828 19H19V7.828l3-3V22H4.828l3-3z" fill="var(--primary)"></path>
          <path class="svg-position__path--other" d="M2 2h17.172l-3 3H5v11.172l-3 3V2zm7 13h6V9H9v6z" fill="#e5e3e0"></path>
        </svg>
      `
    case 'SPT':
      return html`
        <svg class="svg-position" viewBox="0 0 24 24">
          <path
            class="svg-position__path--line"
            d="M13.991 8.327l2.248-2.036H24c-2.553 2.327-4.69 2.86-5.44 2.836h-1.45l2.03 2.91-3.553 1.527-1.596-5.237zM14.644 19.745L12.758 9.127l-.798.946V22l2.684-2.255zM10.009 8.327L7.76 6.291H0c2.553 2.327 4.69 2.86 5.44 2.836h1.45l-2.03 2.91 3.553 1.527 1.596-5.237zM9.277 19.745l1.886-10.618.797.946V22l-2.683-2.255zM9.048 2L8.25 3.382 11.876 7.6l3.627-4.218L14.56 2H9.048z"
            fill="var(--primary)"
          ></path>
        </svg>
      `
  }
}
