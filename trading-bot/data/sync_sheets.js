/**
 * Google Sheets Sync for Twin Capital Trading Data
 * 
 * SETUP OPTIONS:
 * 
 * Option 1 - Service Account (Recommended):
 * 1. Go to Google Cloud Console -> Create Credentials -> Service Account
 * 2. Download JSON key file
 * 3. Set GOOGLE_APPLICATION_CREDENTIALS env var to the JSON file path
 * 
 * Option 2 - OAuth (For testing):
 * 1. Create OAuth credentials in Google Cloud Console
 * 2. Download client_secret.json
 * 3. Run: node sync_sheets.js --auth
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Configuration
const SPREADSHEET_ID = '1Zo-4D-XgZQvOSMJbl8RZc6EuTDbvx--CF0X2ZzR2TWQ';
const SHEET_NAME = 'Sheet1';

// Trade data to sync
const trades = [
  {
    '#': 1,
    'Entry Date': '2026-03-06',
    'Entry Time': '18:26',
    'Asset': 'BTCUSDT',
    'Entry Price': '70566',
    'Exit Price': '',
    'Position Size': '$10',
    'Position Qty': '0.00071',
    'Side': 'LONG',
    'Leverage': '5x',
    'Profit/Loss ($)': '+$3.66',
    'Profit/Loss (%)': '+0.5%',
    'Timeframe': '4H',
    'Market Condition': 'Trending',
    'Signal': 'RSI Oversold',
    'Notes': 'Auto sniper entry',
    'Status': 'WIN'
  },
  {
    '#': 2,
    'Entry Date': '2026-03-06',
    'Entry Time': '18:30',
    'Asset': 'HUMAUSDT',
    'Entry Price': '0.0213',
    'Exit Price': '0.0211',
    'Position Size': '$5',
    'Position Qty': '250',
    'Side': 'LONG',
    'Leverage': '1x',
    'Profit/Loss ($)': '-$0.10',
    'Profit/Loss (%)': '-2%',
    'Timeframe': '1H',
    'Market Condition': 'Volatile',
    'Signal': 'Momentum',
    'Notes': 'SNIPER - Pump peak entry',
    'Status': 'LOSS'
  },
  {
    '#': 3,
    'Entry Date': '2026-03-06',
    'Entry Time': '18:31',
    'Asset': 'KITEUSDT',
    'Entry Price': '0.3208',
    'Exit Price': '0.3176',
    'Position Size': '$5',
    'Position Qty': '16',
    'Side': 'LONG',
    'Leverage': '1x',
    'Profit/Loss ($)': '-$0.07',
    'Profit/Loss (%)': '-1.4%',
    'Timeframe': '1H',
    'Market Condition': 'Volatile',
    'Signal': 'Momentum',
    'Notes': 'SNIPER',
    'Status': 'LOSS'
  },
  {
    '#': 4,
    'Entry Date': '2026-03-06',
    'Entry Time': '18:32',
    'Asset': 'ROAMUSDT',
    'Entry Price': '0.0435',
    'Exit Price': '0.0431',
    'Position Size': '$5',
    'Position Qty': '120',
    'Side': 'LONG',
    'Leverage': '1x',
    'Profit/Loss ($)': '-$0.03',
    'Profit/Loss (%)': '-0.6%',
    'Timeframe': '1H',
    'Market Condition': 'Volatile',
    'Signal': 'Momentum',
    'Notes': 'SNIPER',
    'Status': 'LOSS'
  }
];

// Headers matching the template
const headers = [
  '#', 'Entry Date', 'Entry Time', 'Asset', 'Entry Price', 'Exit Price',
  'Position Size', 'Position Qty', 'Side', 'Leverage',
  'Profit/Loss ($)', 'Profit/Loss (%)', 'Timeframe',
  'Market Condition', 'Signal', 'Notes', 'Status'
];

async function syncToSheets() {
  try {
    // Check for credentials
    const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    
    if (!credsPath || !fs.existsSync(credsPath)) {
      console.log('⚠️ Google credentials not found');
      console.log('\n📋 SETUP INSTRUCTIONS:');
      console.log('1. Go to https://console.cloud.google.com/');
      console.log('2. Create a project and enable Google Sheets API');
      console.log('3. Create Service Account and download JSON key');
      console.log('4. Set: export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json');
      console.log('5. Share your sheet with the service account email');
      console.log('\nAlternatively, you can manually copy the data below to Google Sheets:\n');
      
      // Print data as CSV for manual copy
      console.log('--- CSV DATA ---');
      console.log(headers.join(','));
      trades.forEach(t => {
        console.log(Object.values(t).join(','));
      });
      
      return;
    }

    // Authenticate
    const auth = new google.auth.GoogleAuth({
      keyFile: credsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get existing data
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:Z`,
    });

    console.log(`📊 Found ${existing.data.values ? existing.data.values.length - 1 : 0} existing rows`);

    // Clear and write new data
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:Z`,
    });

    // Write headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [headers],
      },
    });

    // Write trade data
    const rows = trades.map(t => Object.values(t));
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: rows,
      },
    });

    console.log(`✅ Synced ${trades.length} trades to Google Sheets!`);
    console.log(`📝 Sheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Print data as fallback
    console.log('\n📋 Copy this data to Google Sheets:\n');
    console.log(headers.join('\t'));
    trades.forEach(t => {
      console.log(Object.values(t).join('\t'));
    });
  }
}

// Run
syncToSheets();
