ChametOfficialAgency.in - Static website (HTML5 + CSS3 + vanilla JavaScript)
===========================================================================

No frameworks, no npm, no build step. Upload the files and the site works.


1. FILE STRUCTURE
-----------------
index.html                          Homepage (sections: #home, #about-us, #contact, #faq)
chamet-agency/index.html            Chamet Agency page        -> /chamet-agency/
chamet-hosting/index.html           Chamet Hosting page       -> /chamet-hosting/
blog/index.html                     Blog listing              -> /blog/
blog/<article-name>/index.html      7 articles:
    how-to-register-chamet-agency
    chamet-agency-commission-explained
    chamet-host-registration-guide
    chamet-beans-conversion
    chamet-payment-withdrawal-guide
    chamet-agency-responsibilities
    chamet-host-profile-tips
privacy-policy/index.html           Privacy Policy (footer link only)
terms-and-conditions/index.html     Terms and Conditions (footer link only)
404.html                            "Page not found" page
assets/css/style.css                All styles
assets/js/main.js                   Mobile menu, calculators, blog search, image fallback, footer year
assets/images/                      logo, favicon, hero and share image (all included - see 3)
robots.txt, sitemap.xml, .htaccess  SEO and server settings

Each page is a folder containing index.html, which gives clean URLs
(/chamet-agency/) that open directly and survive a page refresh.
Internal links are relative, so the site also works if previewed in a subfolder.
The 404 page alone uses root paths (/assets/...), because the server can show it at any address.


2. CSS AND JAVASCRIPT
---------------------
assets/css/style.css  - colours are defined as variables at the top (:root).
assets/js/main.js     - no libraries. The site still works with JavaScript off
                        (except the mobile menu toggle, calculators and blog search).


3. IMAGES (INCLUDED - ORIGINAL ARTWORK)
---------------------------------------
All images are original artwork made for this site (no Chamet logos or
screenshots, to avoid trademark problems). They are in public_html/assets/images/:
    logo.svg      Original logo (chat bubble + "C"); also the modern browser favicon.
    logo.png      128 x 128 PNG of the logo, used in the header and footer.
    favicon.png   192 x 192 PNG favicon / phone home-screen icon.
    hero.svg      Homepage hero illustration (sharp at any size, ~6 KB).
    og-image.jpg  1200 x 630 image shown when a page is shared on WhatsApp,
                  Facebook, X etc.
To replace one, upload a new file with the SAME lowercase name (Hostinger is
case-sensitive). If an image is ever missing, the site hides it automatically.
Earlier versions that used the Chamet app icon and banner are in the git history.


4. UPLOADING TO HOSTINGER
-------------------------
1. hPanel > Websites > Manage > Files > File Manager.
2. Open public_html. Back up / remove any old site files you no longer need
   (check for an existing .htaccess first and merge any rules you still need).
3. Upload ALL files and folders from this project, keeping the folder structure,
   so index.html sits directly inside public_html. (Easiest: zip everything,
   upload the zip, then Extract inside public_html.)
4. Make sure the hidden .htaccess file was uploaded too.
Do NOT upload README.txt if you prefer to keep it private (it is harmless either way).


5. HTTPS / SSL
--------------
hPanel > Security > SSL: install the free SSL certificate for chametofficialagency.in.
Then turn on "Force HTTPS" there, OR remove the # marks from the HTTPS block in .htaccess.
Only do this AFTER the certificate is active, otherwise visitors get errors.


6. TESTING THE PUBLISHED SITE
-----------------------------
- Open https://chametofficialagency.in/ and click all 6 menu items, on desktop and phone.
- Open https://chametofficialagency.in/chamet-agency/ directly and press refresh.
- From the agency page, click "About Us" and "Contact" - they should jump to the homepage sections.
- Click the green WhatsApp button on several pages and confirm it opens the right chat.
- Check the logo, hero image and browser-tab icon appear.
- Visit https://chametofficialagency.in/does-not-exist to see the 404 page.


7. GOOGLE SEARCH CONSOLE
------------------------
1. https://search.google.com/search-console > Add property > Domain > chametofficialagency.in
2. Verify with the DNS TXT record (hPanel > Domains > DNS / Nameservers).
3. Sitemaps > enter: sitemap.xml > Submit.
4. Use "URL inspection" to request indexing of the main pages.


8. PERFORMANCE
--------------
Test at https://pagespeed.web.dev/ with the live URL. Large images are the usual
problem: the hero is a ~6 KB SVG and the share image ~70 KB, so images are light.
No scores have been measured yet - test after uploading.


9. UPDATING CONTENT
-------------------
- Edit the .html files with any text editor (or Hostinger File Manager > Edit).
- Header, footer and WhatsApp button are repeated on every page; if you change
  them, use "find and replace across files" in an editor such as VS Code.
- Adding an article: copy a folder in blog/, rename it, edit title, meta description,
  canonical URL, H1, content and JSON-LD; add a card to blog/index.html; add the URL to sitemap.xml.
- WhatsApp number: search all files for 918132958338 and "+91 81329 58338".
  NOTE: the original brief gave the number +91 81329 58338 but the link
  wa.me/919132958338 (8132... vs 9132...). The site uses the written number,
  wa.me/918132958338. If 9132958338 is actually correct, replace 918132958338
  and "+91 81329 58338" in every file.


10. FIGURES THAT REQUIRE VERIFICATION
-------------------------------------
These come from historical material and are published ONLY as clearly labelled,
unverified historical/illustrative information. Verify before changing the wording:
- Agency class table A-K (USD 500 / 5% ... USD 5,000,000 / 30%) - chamet-agency/ page.
  Unclear whether thresholds are monthly, cumulative or something else.
- Beans conversion 10,000 Beans = USD 1 and its examples - chamet-hosting/ and Beans article.
- $10 minimum withdrawal, multiples of $10, balance carryover, face verification,
  Metwallet - hosting page and payment article.
- No official agency or host registration URL is published (none was verified).
- Commission examples (5%, 10%, 12%, 15%) are hypothetical arithmetic only.
- Calculators: chamet-agency/#commission-calculator (starts at $1,000 x 10%) and
  chamet-hosting/#beans-calculator (starts at the unverified 10,000 Beans = $1).
  They only multiply/divide what the visitor types. If you confirm the current
  Beans ratio, change value="10000" on the bc-ratio input and update the wording.
