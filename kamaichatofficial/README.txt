Kamaichat Official - kamaichatofficial.in
=========================================
Static website: plain HTML5 + CSS3 + vanilla JavaScript. No framework, no build step.

UPLOAD (Hostinger): upload EVERYTHING inside this "kamaichatofficial" folder
(including the hidden .htaccess file) directly into public_html of kamaichatofficial.in.

PAGES
  index.html                 Home
  become-a-host.html         Become a Host
  agency-partner.html        Agency Partner programme
  register.html              Registration (Host / Agency tabs; ?type=host or ?type=agency)
  about.html                 About Us
  faq.html                   FAQ (with FAQ rich-result schema)
  contact.html               Contact (form + WhatsApp + email)
  privacy-policy.html        Privacy Policy
  terms-and-conditions.html  Terms & Conditions
  404.html                   Not-found page

SHARED FILES
  style.css, main.js, logo.svg, favicon.svg, favicon.png, apple-touch-icon.png,
  og-image.png (1200x630 social share image), robots.txt, sitemap.xml, .htaccess

HOW THE FORMS WORK
  No server/database needed. On submit, the form is validated (10-digit Indian
  mobile, age 18+, required fields) and WhatsApp opens with all details pre-filled
  to the official number. The visitor just presses Send.

CHANGE CONTACT DETAILS
  WhatsApp number used: 918132958338 (shown as +91 81329 58338)
  Email used:           contact@kamaichatofficial.in  (create this mailbox in Hostinger)
  To change them, search-and-replace across all .html files, e.g.:
    sed -i 's/918132958338/91XXXXXXXXXX/g; s/+91 81329 58338/+91 XXXXX XXXXX/g' *.html

AFTER GOING LIVE
  1. Enable SSL in hPanel, then un-comment the HTTPS block in .htaccess.
  2. Add the site to Google Search Console and submit https://kamaichatofficial.in/sitemap.xml
