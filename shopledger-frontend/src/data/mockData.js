export const dashboardStats = [
  { label: "Total Receivable", value: 186500, tone: "green", icon: "trending_up" },
  { label: "Total Payable", value: 84200, tone: "red", icon: "trending_down" },
  { label: "Cash In Hand", value: 56340, tone: "blue", icon: "account_balance_wallet" },
  { label: "Net Balance", value: 102300, tone: "purple", icon: "balance" }
];

export const recentTransactions = [
  { party: "Rahul Traders", type: "Credit", amount: 4500, date: "2026-03-20" },
  { party: "Shiv Supplies", type: "Debit", amount: 2200, date: "2026-03-20" },
  { party: "Maya Stores", type: "Credit", amount: 9800, date: "2026-03-19" },
  { party: "Anand Wholesale", type: "Debit", amount: 5500, date: "2026-03-18" }
];

export const customers = [
  { id: "c1", name: "Rahul Traders", phone: "+91 98765 12345", email: "rahul@shop.com", balance: 18000, lastTx: "2026-03-20" },
  { id: "c2", name: "Maya Stores", phone: "+91 91234 88776", email: "maya@shop.com", balance: -2500, lastTx: "2026-03-18" },
  { id: "c3", name: "Kiran Retail", phone: "+91 99887 11223", email: "kiran@shop.com", balance: 9200, lastTx: "2026-03-16" }
];

export const suppliers = [
  { id: "s1", name: "Shiv Supplies", phone: "+91 90001 22233", email: "shiv@supply.com", balance: 15400, lastTx: "2026-03-20" },
  { id: "s2", name: "Anand Wholesale", phone: "+91 98888 33221", email: "anand@supply.com", balance: -1300, lastTx: "2026-03-19" },
  { id: "s3", name: "Freshline", phone: "+91 95555 22211", email: "fresh@supply.com", balance: 7400, lastTx: "2026-03-14" }
];

export const cashbookEntries = [
  { id: "cb1", type: "Cash In", category: "Sale", notes: "Counter sale", amount: 6200, date: "2026-03-21" },
  { id: "cb2", type: "Cash Out", category: "Expense", notes: "Electricity bill", amount: 1800, date: "2026-03-21" },
  { id: "cb3", type: "Cash In", category: "Payment", notes: "Rahul payment", amount: 3000, date: "2026-03-20" }
];

export const partyTransactions = [
  { id: "t1", date: "2026-03-21", type: "Sale", amount: 2600, notes: "Invoice #SL-101" },
  { id: "t2", date: "2026-03-20", type: "Payment", amount: 1000, notes: "UPI" },
  { id: "t3", date: "2026-03-18", type: "Return", amount: 300, notes: "Damaged goods" }
];

export const adminShops = [
  { id: "1", name: "Balaji Mart", email: "owner@balaji.com", phone: "+91 90000 11122", registered: "2026-03-19", status: "Pending" },
  { id: "2", name: "City Medicos", email: "owner@citymed.com", phone: "+91 91111 22233", registered: "2026-03-17", status: "Active" },
  { id: "3", name: "Metro Hardware", email: "owner@metro.com", phone: "+91 92222 33344", registered: "2026-03-16", status: "Suspended" }
];
