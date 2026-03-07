#!/usr/bin/env python3
"""
Google Sheets Sync for Twin Capital Trading Data
================================================

SETUP INSTRUCTIONS:
==================

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project
3. Enable Google Sheets API and Google Drive API
4. Create Service Account credentials
5. Download the JSON key file
6. Share your Google Sheet with the service account email
7. Set the path to your credentials file below

CREDENTIALS FILE FORMAT (credentials.json):
========================================
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "your-service-account@project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}

CONFIGURATION:
==============
Set these environment variables:
- GOOGLE_CREDENTIALS_PATH: Path to your credentials.json
- SPREADSHEET_ID: Your Google Sheet ID (from the URL)
"""

import os
import csv
import json
from datetime import datetime

# Try to import gspread, prompt for setup if not available
try:
    import gspread
    from oauth2client.service_account import ServiceAccountCredentials
    GSPREAD_AVAILABLE = True
except ImportError:
    GSPREAD_AVAILABLE = False
    print("⚠️ gspread not installed. Install with: pip install gspread oauth2client")

# Configuration
CREDENTIALS_PATH = os.environ.get('GOOGLE_CREDENTIALS_PATH', 'credentials.json')
SPREADSHEET_ID = os.environ.get('SPREADSHEET_ID', 'YOUR_SPREADSHEET_ID_HERE')
WORKSHEET_NAME = 'Trading Data'

class GoogleSheetsSync:
    def __init__(self, credentials_path=None, spreadsheet_id=None):
        self.credentials_path = credentials_path or CREDENTIALS_PATH
        self.spreadsheet_id = spreadsheet_id or SPREADSHEET_ID
        self.client = None
        self.sheet = None
        
    def authenticate(self):
        """Authenticate with Google Sheets"""
        if not GSPREAD_AVAILABLE:
            print("❌ gspread not available")
            return False
            
        try:
            scope = [
                'https://spreadsheets.google.com/feeds',
                'https://www.googleapis.com/auth/drive'
            ]
            credentials = ServiceAccountCredentials.from_json_keyfile_name(
                self.credentials_path, 
                scope
            )
            self.client = gspread.authorize(credentials)
            print("✅ Authenticated with Google Sheets")
            return True
        except FileNotFoundError:
            print(f"❌ Credentials file not found: {self.credentials_path}")
            print("\n📋 To setup:")
            print("1. Go to https://console.cloud.google.com/")
            print("2. Create project and enable Sheets API")
            print("3. Create Service Account and download JSON")
            print(f"4. Save as: {self.credentials_path}")
            print("5. Share your sheet with the service account email")
            return False
        except Exception as e:
            print(f"❌ Authentication error: {e}")
            return False
    
    def open_spreadsheet(self):
        """Open the Google Sheet"""
        if not self.client:
            return False
        try:
            self.sheet = self.client.open_by_key(self.spreadsheet_id).sheet1
            print(f"✅ Opened sheet: {self.spreadsheet_id}")
            return True
        except Exception as e:
            print(f"❌ Error opening sheet: {e}")
            print("📋 Make sure SPREADSHEET_ID is correct")
            return False
    
    def sync_from_csv(self, csv_file):
        """Sync data from local CSV to Google Sheets"""
        if not self.sheet:
            print("❌ Not connected to Google Sheets")
            return False
        
        try:
            # Read CSV
            with open(csv_file, 'r') as f:
                reader = csv.reader(f)
                rows = list(reader)
            
            # Clear existing data (except headers)
            self.sheet.delete_rows(2, self.sheet.row_count)
            
            # Upload new data
            self.sheet.append_rows(rows[1:])  # Skip header
            
            print(f"✅ Synced {len(rows)-1} trades to Google Sheets")
            return True
        except Exception as e:
            print(f"❌ Sync error: {e}")
            return False
    
    def get_all_data(self):
        """Get all data from Google Sheets"""
        if not self.sheet:
            return []
        return self.sheet.get_all_records()

# Headers matching our template
HEADERS = [
    '#', 'Entry Date', 'Entry Time', 'Asset', 'Entry Price', 'Exit Price',
    'Position Size', 'Position Qty', 'Side', 'Leverage',
    'Profit/Loss ($)', 'Profit/Loss (%)', 'Timeframe',
    'Market Condition', 'Signal', 'Notes', 'Status'
]

def setup_spreadsheet():
    """Create a new Google Sheet with the correct structure"""
    sync = GoogleSheetsSync()
    
    if not sync.authenticate():
        return None
    
    # Create new spreadsheet
    spreadsheet = sync.client.create('Twin Capital - Trading Data')
    print(f"✅ Created new spreadsheet: {spreadsheet.title}")
    
    # Get first sheet
    sheet = spreadsheet.sheet1
    sheet.update('A1', [HEADERS])
    
    # Print the spreadsheet ID
    print(f"\n📊 SPREADSHEET ID: {spreadsheet.id}")
    print("Share this ID with me!")
    
    return spreadsheet.id

# Quick manual export
def export_to_csv_for_sheets():
    """Export current data to CSV that can be imported to Sheets"""
    csv_file = 'trades_export.csv'
    
    # Local data would be here
    # This creates a template that can be imported
    
    print("""
📋 GOOGLE SHEETS SETUP GUIDE:
==============================

OPTION 1 - Quick Import:
-------------------------
1. Open Google Sheets (sheets.google.com)
2. File → Import → Upload
3. Upload trades_template.csv
4. Done!

OPTION 2 - Live Sync (Advanced):
--------------------------------
1. Create project at console.cloud.google.com
2. Enable Google Sheets API
3. Create Service Account
4. Download credentials.json
5. Run: export GOOGLE_CREDENTIALS_PATH=credentials.json
6. Run: export SPREADSHEET_ID=your_sheet_id
7. Run: python sync_to_sheets.py

OPTION 3 - Manual Copy Paste:
------------------------------
1. Open trades_template.csv
2. Copy all data
3. Paste to Google Sheets
4. Use Data → Data validation for dropdowns
""")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == 'create':
            setup_spreadsheet()
        elif sys.argv[1] == 'sync':
            sync = GoogleSheetsSync()
            if sync.authenticate() and sync.open_spreadsheet():
                sync.sync_from_csv('trades_template.csv')
        else:
            print("Usage: python sync_sheets.py [create|sync]")
    else:
        export_to_csv_for_sheets()
