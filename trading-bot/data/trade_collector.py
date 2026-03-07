#!/usr/bin/env python3
"""
Trade Data Collector
Collects and analyzes trading data for Twin Capital
"""

import csv
import os
from datetime import datetime

DATA_FILE = os.path.join(os.path.dirname(__file__), "trades_data.csv")

def init_csv():
    """Initialize CSV file with headers"""
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                '#', 'Entry Date', 'Entry Time', 'Asset', 'Entry Price', 'Exit Price',
                'Position Size', 'Position Qty', 'Side', 'Leverage',
                'Profit/Loss ($)', 'Profit/Loss (%)', 'Timeframe',
                'Market Condition', 'Signal', 'Notes', 'Status'
            ])

def add_trade(trade_data):
    """Add a new trade to the database"""
    with open(DATA_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        # Get next trade number
        trade_num = get_total_trades() + 1
        trade_data.insert(0, trade_num)
        writer.writerow(trade_data)

def get_total_trades():
    """Get total number of trades"""
    with open(DATA_FILE, 'r') as f:
        return sum(1 for line in f) - 1  # Minus header

def get_stats():
    """Calculate trading statistics"""
    trades = []
    with open(DATA_FILE, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['Profit/Loss ($)'] and row['Profit/Loss ($)'] != '$0.00':
                trades.append(row)
    
    if not trades:
        return None
    
    total_pnl = sum(float(row['Profit/Loss ($)'].replace('$', '').replace('+', '')) for row in trades)
    wins = [t for t in trades if float(t['Profit/Loss ($)'].replace('$', '').replace('+', '')) > 0]
    losses = [t for t in trades if float(t['Profit/Loss ($)'].replace('$', '').replace('+', '')) <= 0]
    
    return {
        'total_trades': len(trades),
        'total_pnl': total_pnl,
        'wins': len(wins),
        'losses': len(losses),
        'win_rate': (len(wins) / len(trades) * 100) if trades else 0,
        'avg_win': sum(float(w['Profit/Loss ($)'].replace('$', '').replace('+', '')) for w in wins) / len(wins) if wins else 0,
        'avg_loss': abs(sum(float(l['Profit/Loss ($)'].replace('$', '').replace('+', '')) for l in losses) / len(losses)) if losses else 0,
    }

def print_stats():
    """Print statistics"""
    stats = get_stats()
    if not stats:
        print("No trades recorded yet.")
        return
    
    print("\n" + "="*50)
    print("📊 TRADE STATISTICS")
    print("="*50)
    print(f"Total Trades: {stats['total_trades']}")
    print(f"Total P&L: ${stats['total_pnl']:.2f}")
    print(f"Wins: {stats['wins']} | Losses: {stats['losses']}")
    print(f"Win Rate: {stats['win_rate']:.1f}%")
    print(f"Avg Win: ${stats['avg_win']:.2f}")
    print(f"Avg Loss: ${stats['avg_loss']:.2f}")
    print("="*50 + "\n")

# Initialize on import
init_csv()

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "stats":
            print_stats()
        elif sys.argv[1] == "add":
            # Example: python trade_collector.py add BTCUSDT 67000 67500 $100 LONG 5x +$5.00 +5% 4H Trending MA_Cross
            trade = sys.argv[2:]
            add_trade(trade)
            print("Trade added!")
    else:
        print("Usage:")
        print("  python trade_collector.py add <trade_data>")
        print("  python trade_collector.py stats")
