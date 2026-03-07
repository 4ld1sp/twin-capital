#!/usr/bin/env python3
"""
Auto Sniper v2 - Twin Capital
Budget: $20/hari
Risk:Reward = 1:2.5
"""

import os
import time
import json
import hmac
import hashlib
import requests
from datetime import datetime

API_KEY = "nC2pOwuqmbRA9887Yy"
API_SECRET = "yf8g0gJLjidLrKIUIIShY0B9JigIUDu8lDFS"

DAILY_BUDGET = 20
RISK_REWARD = 2.5  # 1:2.5 ratio

class BybitSniper:
    def __init__(self):
        self.base_url = "https://api.bybit.com"
        self.recv_window = "5000"
        
    def sign(self, params_str):
        return hmac.new(API_SECRET.encode(), params_str.encode(), hashlib.sha256).hexdigest()
    
    def request(self, method, endpoint, params=None):
        timestamp = str(int(time.time() * 1000))
        query, body = "", ""
        
        if params:
            if method == "GET":
                query = "&".join([f"{k}={v}" for k,v in sorted(params.items())])
                param_str = f"{timestamp}{API_KEY}{self.recv_window}{query}"
            else:
                body = json.dumps(params)
                param_str = f"{timestamp}{API_KEY}{self.recv_window}{body}"
        
        signature = self.sign(param_str)
        headers = {
            "X-BAPI-API-KEY": API_KEY,
            "X-BAPI-TIMESTAMP": timestamp,
            "X-BAPI-SIGN": signature,
            "X-BAPI-RECV-WINDOW": self.recv_window,
            "Content-Type": "application/json"
        }
        
        url = f"{self.base_url}{endpoint}"
        if query: url += f"?{query}"
        
        return requests.request(method, url, headers=headers, data=body if body else None).json()
    
    def get_price(self, symbol):
        result = self.request("GET", "/v5/market/tickers", {"category": "linear", "symbol": symbol})
        if result.get("retCode") == 0:
            t = result["result"]["list"][0]
            return {
                "price": float(t["lastPrice"]),
                "change": float(t["price24hPcnt"]) * 100,
                "high": float(t["highPrice24h"]),
                "low": float(t["lowPrice24h"]),
                "volume": float(t["volume24h"])
            }
        return None
    
    def get_top_coins(self):
        result = self.request("GET", "/v5/market/tickers", {"category": "linear"})
        if result.get("retCode") != 0: return []
        
        coins = []
        for t in result["result"]["list"]:
            if "USDT" not in t["symbol"] or t["symbol"] == "BTCUSDT": continue
            vol = float(t.get("volume24h", 0))
            if vol > 1000000:
                coins.append({
                    "symbol": t["symbol"],
                    "price": float(t["lastPrice"]),
                    "change": float(t["price24hPcnt"]) * 100,
                    "high": float(t["highPrice24h"]),
                    "low": float(t["lowPrice24h"]),
                    "volume": vol
                })
        return sorted(coins, key=lambda x: x["change"], reverse=True)
    
    def analyze(self, coins):
        """Cari entry dengan pullback dan R:R 1:2.5"""
        opportunities = []
        
        for c in coins:
            price = c["price"]
            high = c["high"]
            change = c["change"]
            
            # Pullback dari pump tinggi (>15% naik)
            if change > 15:
                retrace = ((high - price) / high) * 100
                if retrace > 5:  # Sudah pullback >5%
                    # Hitung SL & TP dengan R:R 1:2.5
                    risk = price * 0.02  # 2% risk
                    reward = risk * RISK_REWARD  # 2.5x reward
                    entry = price * 0.99  # Limit slightly below
                    sl = entry - risk
                    tp = entry + reward
                    
                    opportunities.append({
                        "symbol": c["symbol"],
                        "signal": "PULLBACK",
                        "entry": entry,
                        "sl": sl,
                        "tp": tp,
                        "change": change,
                        "retrace": retrace,
                        "risk_usd": risk,
                        "reward_usd": reward
                    })
            
            # Koreksi sehat (-3% s/d 0%)
            if -3 < change < 0 and c["volume"] > 5000000:
                risk = price * 0.015  # 1.5% risk
                reward = risk * RISK_REWARD
                entry = price * 0.995
                sl = entry - risk
                tp = entry + reward
                
                opportunities.append({
                    "symbol": c["symbol"],
                    "signal": "KOREKSI",
                    "entry": entry,
                    "sl": sl,
                    "tp": tp,
                    "change": change,
                    "retrace": 0,
                    "risk_usd": risk,
                    "reward_usd": reward
                })
        
        return opportunities
    
    def open_position(self, symbol, qty, entry, tp, sl):
        """Buka posisi dengan limit order"""
        result = self.request("POST", "/v5/order/create", {
            "category": "linear",
            "symbol": symbol,
            "side": "Buy",
            "orderType": "Limit",
            "qty": str(qty),
            "price": str(entry),
            "takeProfit": str(tp),
            "stopLoss": str(sl)
        })
        return result
    
    def get_balance(self):
        result = self.request("GET", "/v5/account/wallet-balance", {"accountType": "UNIFIED"})
        if result.get("retCode") == 0:
            return float(result["result"]["list"][0]["totalEquity"])
        return None
    
    def report(self, coins, opportunities):
        btc = self.get_price("BTCUSDT")
        
        print("\n" + "="*55)
        print(f"📊 AUTO-SNIPER v2 - {datetime.now().strftime('%H:%M')} | Budget: ${DAILY_BUDGET}")
        print("="*55)
        
        print(f"\n📌 BTC: ${btc['price']:,.0f} ({btc['change']:+.2f}%)")
        
        print("\n🔥 TOP MOVERS:")
        for c in coins[:5]:
            print(f"   {c['symbol']:<12} {c['change']:+.2f}%")
        
        if opportunities:
            print(f"\n💡 OPPORTUNITIES FOUND ({len(opportunities)}):")
            for o in opportunities[:3]:
                print(f"\n   🎯 {o['symbol']} ({o['signal']})")
                print(f"      Entry: ${o['entry']:.4f} | SL: ${o['sl']:.4f} | TP: ${o['tp']:.4f}")
                print(f"      Risk: ${o['risk_usd']:.2f} → Reward: ${o['reward_usd']:.2f} (1:{RISK_REWARD})")
                print(f"      Change: {o['change']:+.1f}% | Retrace: {o['retrace']:.1f}%")
        else:
            print(f"\n💤 TIDAK ADA MOMEN — Waiting for pullback...")
        
        print("\n" + "="*55)


if __name__ == "__main__":
    sniper = BybitSniper()
    
    while True:
        try:
            coins = sniper.get_top_coins()
            opportunities = sniper.analyze(coins)
            sniper.report(coins, opportunities)
            
            # Auto execute if opportunity found
            if opportunities and DAILY_BUDGET > 0:
                o = opportunities[0]  # Ambil yang pertama
                price = coins[0]["price"]
                qty = int((DAILY_BUDGET / 2) / o["entry"])  # Split budget
                
                if qty > 0:
                    print(f"\n🚀 EXECUTING: {o['symbol']}...")
                    result = sniper.open_position(o["symbol"], qty, o["entry"], o["tp"], o["sl"])
                    if result.get("retCode") == 0:
                        print(f"   ✅ ORDER PLACED! Qty: {qty}")
                    else:
                        print(f"   ❌ ERROR: {result.get('retMsg')}")
            
            print("\n⏰ Next update 10 menit...")
            time.sleep(600)
            
        except KeyboardInterrupt:
            print("\n🛑 Stopped")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")
            time.sleep(60)
