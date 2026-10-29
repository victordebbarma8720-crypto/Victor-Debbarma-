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
assets/js/main.js                   Mobile menu, blog search, image fallback, footer year
assets/images/                      hero.jpg (included); logo.png, favicon.png (YOU must add - see 3)
robots.txt, sitemap.xml, .htaccess  SEO and server settings

Each page is a folder containing index.html, which gives clean URLs
(/chamet-agency/) that open directly and survive a page refresh.
Internal links are relative, so the site also works if previewed in a subfolder.
The 404 page alone uses root paths (/assets/...), because the server can show it at any address.


2. CSS AND JAVASCRIPT
---------------------
assets/css/style.css  - colours are defined as variables at the top (:root).
assets/js/main.js     - no libraries. The site still works with JavaScript off
                        (except the mobile menu toggle and blog search).


3. IMAGES (REQUIRED - NOT INCLUDED)
-----------------------------------
The image files were not available when the site was built. Upload them to
public_html/assets/images/ with these exact lowercase names:
    logo.png   favicon.png
The hero image is already included as assets/images/hero.jpg (1600 x 724,
rotated upright and cropped from your screenshot). To replace it, upload a new
hero.jpg and update width/height on its <img> tag in index.html.
Hostinger is case-sensitive: "Logo.PNG" will NOT work.
Until they exist, the site hides the missing image and shows a text logo.
Once logo.png loads, the text wordmark "ChametAgency.in" next to it is hidden
automatically, so the logo is not duplicated.


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
problem: keep hero.jpg under ~300 KB (currently ~130 KB) (compress at tinypng.com or squoosh.app).
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
