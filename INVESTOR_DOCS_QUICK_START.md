# Investor Documents - Quick Start Guide

## ✅ What We Built Today

Your investor portal now has a **dynamic document library** powered by Notion CMS!

### Features:
- ✅ Real-time document updates (edit in Notion, instantly reflects in portal)
- ✅ Search functionality
- ✅ Category filtering (Financial, Legal, Product, Market, Other)
- ✅ Access control (Investor, Admin, All)
- ✅ Tag-based organization
- ✅ Automatic date formatting ("2 days ago", "1 week ago")
- ✅ Graceful fallback (shows message if no documents)

---

## 🚀 Quick Setup (30 Minutes)

### Step 1: Create Investor Documents Database in Notion

1. Open Notion and create a new **full-page database**
2. Name it: **"Investor Documents"**
3. Add these properties:

| Property Name | Type | Required Options |
|--------------|------|------------------|
| Document Title | Title | (default) |
| Category | Select | Financial, Legal, Product, Market, Other |
| File URL | URL | (for document links) |
| Description | Text | (brief summary) |
| Upload Date | Date | (when added) |
| Access Level | Select | All, Investor, Admin |
| Status | Select | Active, Archived, Draft |
| Tags | Multi-select | (custom tags) |
| File Size | Text | (e.g., "2.4 MB") |
| File Type | Select | PDF, XLSX, DOCX, Other |

### Step 2: Share with Integration

1. Click "..." menu on the database
2. Select "Add connections"
3. Choose "GrahmOS Investor Portal" (your integration)
4. The database is now connected!

### Step 3: Get Database ID

1. Open the database as a full page
2. Copy the URL - it looks like:
   ```
   https://www.notion.so/workspace/abc123def456...?v=xyz
   ```
3. The database ID is the long string: `abc123def456...`

### Step 4: Add to Environment Variables

**Local (.env file):**
```bash
VITE_INVESTOR_DOCS_DATABASE_ID=your_database_id_here
```

**Netlify (Production):**
1. Go to Site Settings → Environment variables
2. Add: `VITE_INVESTOR_DOCS_DATABASE_ID` = `your_database_id_here`
3. Redeploy your site

---

## 📄 Adding Your First Documents

### Example 1: Financial Report

1. Create new page in Investor Documents database
2. Fill in:
   - **Document Title**: Q4 2024 Financial Report
   - **Category**: Financial
   - **File URL**: https://drive.google.com/file/d/YOUR_FILE_ID (or Dropbox, etc.)
   - **Description**: Quarterly financial performance and projections
   - **Upload Date**: Today's date
   - **Access Level**: Investor
   - **Status**: Active
   - **Tags**: Q4-2024, Financial-Report
   - **File Size**: 2.4 MB
   - **File Type**: PDF

3. Save - it's now visible in the investor portal!

### Example 2: Pitch Deck

1. Create new page
2. Fill in:
   - **Document Title**: GrahmOS Investor Pitch Deck
   - **Category**: Product
   - **File URL**: [Your file link]
   - **Description**: Complete investor presentation with market analysis and projections
   - **Upload Date**: Today
   - **Access Level**: All
   - **Status**: Active
   - **Tags**: Pitch, Q1-2025
   - **File Size**: 8.5 MB
   - **File Type**: PDF

### Where to Host Files:

**Option 1: Google Drive** (Recommended)
1. Upload file to Google Drive
2. Right-click → Share → Get link
3. Set to "Anyone with the link can view"
4. Paste URL in File URL field

**Option 2: Dropbox**
1. Upload to Dropbox
2. Get shareable link
3. Paste in File URL field

**Option 3: Notion** 
1. Upload file directly to Notion page
2. Copy file URL from Notion
3. Paste in File URL field

---

## 🎯 Testing the Integration

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:8081/investor-portal`
3. Click "Documents" tab
4. You should see your documents!

**If you see "No Documents Available":**
- Check that database ID is correct in `.env`
- Verify database is shared with integration
- Confirm documents have Status = "Active"
- Ensure Access Level includes your user's role

---

## 👥 Access Control Examples

### Public Document (All Users)
- Access Level: **All**
- Visible to: Everyone who can access the portal

### Investor-Only Document
- Access Level: **Investor**
- Visible to: Users with `investor` or `admin` role

### Admin-Only Document
- Access Level: **Admin**
- Visible to: Only users with `admin` role

---

## 🔍 Search & Filter Features

**Search Bar:**
- Searches document titles, descriptions, and tags
- Real-time filtering as you type

**Category Filters:**
- Click category button to filter
- Click "All" to clear filter
- Combines with search

**Example Queries:**
- Search "financial" → Shows all financial documents
- Filter by "Legal" → Shows only legal category
- Search "Q4" + Filter "Financial" → Shows Q4 financial docs

---

## 📊 Sample Document Collection

Here's a starter set of documents to add:

1. **Executive Summary & Pitch Deck**
   - Category: Product | Tags: Pitch, Overview
   
2. **Q4 2024 Financial Report**
   - Category: Financial | Tags: Q4-2024, Financial-Report
   
3. **5-Year Financial Projections**
   - Category: Financial | Tags: Projections, Model
   
4. **Market Analysis Report**
   - Category: Market | Tags: Research, TAM
   
5. **Product Roadmap 2025**
   - Category: Product | Tags: Roadmap, 2025
   
6. **Investment Terms Sheet**
   - Category: Legal | Tags: Terms, Legal
   
7. **Technical Architecture Whitepaper**
   - Category: Product | Tags: Technical, Whitepaper
   
8. **Team Bios & Backgrounds**
   - Category: Other | Tags: Team, Leadership

---

## 🚨 Troubleshooting

### "Loading documents..." forever
**Cause**: Database ID not configured or incorrect  
**Fix**: Check `VITE_INVESTOR_DOCS_DATABASE_ID` in `.env`

### "No Documents Available" but documents exist
**Possible causes:**
1. Documents have Status = "Draft" or "Archived"
   - **Fix**: Set Status to "Active"
2. Documents have wrong Access Level
   - **Fix**: Set to "Investor" or "All"
3. Database not shared with integration
   - **Fix**: Add connection in Notion

### Documents don't update
**Cause**: Browser cache  
**Fix**: Hard refresh (Cmd+Shift+R on Mac, Ctrl+F5 on Windows)

### "Property not found" error
**Cause**: Missing or misnamed property in Notion  
**Fix**: Verify all property names match exactly (case-sensitive)

---

## 🎉 Next Steps

### Phase 1: Document Library (COMPLETE ✅)
- [x] Notion CMS integration
- [x] Search and filter
- [x] Access control
- [x] Dynamic updates

### Phase 2: Announcements Feed (Next Sprint)
- [ ] Create Announcements database
- [ ] Build announcement component
- [ ] Add to Overview tab
- [ ] Email notifications

### Phase 3: Metrics Dashboard (Future)
- [ ] Create Metrics database
- [ ] Real-time KPI display
- [ ] Trend visualization
- [ ] Historical data

---

## 💡 Pro Tips

1. **Use Consistent Naming**: Use tags like "Q1-2025", "Q2-2025" for easy filtering
2. **Add Descriptions**: Help investors know what's in the document before downloading
3. **Archive Old Versions**: Set Status to "Archived" instead of deleting
4. **Test Access Levels**: Log in with different roles to verify visibility
5. **Regular Updates**: Update Upload Date when you replace documents

---

## 📞 Need Help?

Contact the development team or reference:
- Full setup guide: `NOTION_SETUP.md`
- Architecture document: `NOTION_VS_REACT_PORTAL.md`
- CTO progress report: `CTO_PROGRESS_UPDATE.md`

**Built with:** Notion CMS + React + TypeScript  
**Status:** Production Ready ✅
