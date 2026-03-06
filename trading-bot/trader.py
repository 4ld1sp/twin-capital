#!/usr/bin/env python3
"""
PT. Twin Capital - Trading Bot
Director: AI Assistant
"""

import os
import json
import time
import hmac
import hashlib
import requests
from datetime import datetime

# ============== CONFIG ==============
BYBIT_API_KEY = os.getenv("BYBIT_API_KEY", "")
BYBIT_API_SECRET = os.getenv("BYBIT_API_SECRET", "")

# Trading Parameters
MAX_POSITION_SIZE = 100  # USDT
DEFAULT_LEVERAGE = 5
DEFAULT_TP_PCT = 3.0
DEFAULT_SL_PCT = 1.0

# ============== BYBIT API ==============
class BybitTrader:
    def __init__(self, api_key, api_secret, testnet=False):
        self.api_key = api_key
        self.api_secret = api_secret
        self.base_url = "https://api.bybit.com"
        self.recv_window = "5000"
        
    def sign(self, params_str):
        signature = hmac.new(
            self.api_secret.encode(),
            params_str.encode(),
            hashlib.sha256
        ).hexdigest()
        return signature
        
    def request(self, method, endpoint, params=None):
        timestamp = str(int(time.time() * 1000))
        query = ""
        body = ""
        
        if params:
            if method == "GET":
                query = "&".join([f"{k}={v}" for k, v in sorted(params.items())])
                param_str = f"{timestamp}{self.api_key}{self.recv_window}{query}"
            else:
                body = json.dumps(params)
                param_str = f"{timestamp}{self.api_key}{self.recv_window}{body}"
        
        signature = self.sign(param_str)
        
        headers = {
            "X-BAPI-API-KEY": self.api_key,
            "X-BAPI-TIMESTAMP": timestamp,
            "X-BAPI-SIGN": signature,
            "X-BAPI-RECV-WINDOW": self.recv_window,
            "Content-Type": "application/json"
        }
        
        url = f"{self.base_url}{endpoint}"
        
        if method == "GET":
            if query:
                url += f"?{query}"
            response = requests.get(url, headers=headers)
        else:
            response = requests.request(method, url, headers=headers, data=body)
            
        return response.json()
    
    # ============== TRADING FUNCTIONS ==============
    def get_balance(self):
        result = self.request("GET", "/v5/account/wallet-balance", 
                            {"accountType": "UNIFIED"})
        if result.get("retCode") == 0:
            return float(result["result"]["list"][0]["totalEquity"])
        return None
    
    def get_positions(self):
        result = self.request("GET", "/v5/position/closed-pnl",
                            {"category": "linear", "limit": 20})
        return result.get("result", {}).get("list", [])
    
    def get_current_price(self, symbol="BTCUSDT"):
        result = self.request("GET", "/v5/market/tickers",
                            {"category": "linear", "symbol": symbol})
        if result.get("retCode") == 0:
            return float(result["result"]["list"][0]["lastPrice"])
        return None
    
    def place_order(self, symbol, side, qty, order_type="Market",
                   take_profit=None, stop_loss=None, leverage=5):
        # Set leverage first
        self.request("POST", "/v5/position/set-leverage", {
            "category": "linear",
            "symbol": symbol,
            "buyLeverage": str(leverage),
            "sellLeverage": str(leverage)
        })
        
        params = {
            "category": "linear",
            "symbol": symbol,
            "side": side,
            "orderType": order_type,
            "qty": str(qty)
        }
        
        if take_profit:
            params["takeProfit"] = str(take_profit)
        if stop_loss:
            params["stopLoss"] = str(stop_loss)
            
        result = self.request("POST", "/v5/order/create", params)
        return result
    
    def close_position(self, symbol):
        # Get open positions
        result = self.request("GET", "/v5/position/closed-pnl",
                            {"category": "linear", "symbol": symbol, "limit": 1})
        
    def get_performance(self):
        positions = self.get_positions()
        
        total_pnl = 0
        wins = 0
        losses = 0
        
        for p in positions:
            pnl = float(p.get("closedPnl", 0))
            total_pnl += pnl
            if pnl > 0:
                wins += 1
            else:
                losses += 1
                
        return {
            "total_pnl": total_pnl,
            "wins": wins,
            "losses": losses,
            "win_rate": (wins / (wins + losses) * 100) if (wins + losses) > 0 else 0
        }

# ============== MAIN ==============
def main():
    if not BYBIT_API_KEY or not BYBIT_API_SECRET:
        print("⚠️ Please set BYBIT_API_KEY and BYBIT_API_SECRET")
        return
        
    trader = BybitTrader(BYBIT_API_KEY, BYBIT_API_SECRET)
    
    # Check balance
    balance = trader.get_balance()
    print(f"💰 Balance: ${balance:,.2f}")
    
    # Get performance
    perf = trader.get_performance()
    print(f"📊 Performance: {perf}")

if __name__ == "__main__":
    main()
