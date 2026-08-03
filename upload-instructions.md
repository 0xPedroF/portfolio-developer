# Uploading Your Portfolio to Hostinger

Follow these steps to properly upload your Next.js portfolio to Hostinger:

## 1. Prepare Your Files

Your build has created an `out` directory with all the static files needed for your website. This is what you'll upload to Hostinger.

## 2. Upload Files to Hostinger

1. Log in to your Hostinger control panel
2. Navigate to the File Manager or use FTP (like FileZilla) to connect to your hosting
3. If using the File Manager, navigate to the `public_html` directory (or the directory where your website files should go)
4. Upload all the contents from your local `out` directory to this directory
5. Make sure to also upload the `.htaccess` file (it might be hidden in your file explorer)

## 3. Important Files to Check

Ensure these critical files are properly uploaded:

- `index.html` (in the root directory)
- `.htaccess` (in the root directory)
- The `/en/` and `/pt/` directories with all their contents
- All the files in the `_next` directory

## 4. Test Your Website

1. Visit your domain (e.g., `https://pedrofdev.com/`)
2. You should be automatically redirected to `https://pedrofdev.com/en/`
3. Test navigation between pages
4. Test the language switcher to ensure it works between English and Portuguese

## 5. Troubleshooting

If you encounter issues:

- Check if the `.htaccess` file was properly uploaded (it's often hidden)
- Ensure file permissions are set correctly (typically 644 for files and 755 for directories)
- Clear your browser cache or try in incognito/private mode
- Check the Hostinger error logs if available

## 6. Specific Hostinger Settings

If redirection still doesn't work:

1. Go to your Hostinger control panel
2. Look for "Website" > "SEO & Redirects" section
3. Add a redirect rule:
   - Source: `/`
   - Destination: `/en/`
   - Type: 302 (Temporary) or 301 (Permanent)
   - Save the changes

This should ensure that visitors to your root domain are properly redirected to the English version of your portfolio. 