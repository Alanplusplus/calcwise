"use client";

import { useState, useCallback } from "react";

export function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? digit : display + digit);
      }
    },
    [display, waitingForOperand]
  );

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const toggleSign = useCallback(() => {
    if (display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  }, [display]);

  const inputPercent = useCallback(() => {
    const value = parseFloat(display);
    if (value === 0) return;
    setDisplay(String(value / 100));
  }, [display]);

  const clear = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
  }, []);

  const performOperation = useCallback(
    (operator: string) => {
      const current = parseFloat(display);

      if (operator === "=") {
        if (!expression) return;
        const parts = expression.split(" ");
        const prev = parseFloat(parts[0]);
        const op = parts[1];
        let result: number;

        switch (op) {
          case "+":
            result = prev + current;
            break;
          case "−":
            result = prev - current;
            break;
          case "×":
            result = prev * current;
            break;
          case "÷":
            result = current === 0 ? NaN : prev / current;
            break;
          default:
            return;
        }

        const resultStr = isNaN(result) ? "Error" : formatNumber(result);
        const historyEntry = `${expression} ${display} = ${resultStr}`;
        setHistory((h) => [historyEntry, ...h.slice(0, 9)]);
        setDisplay(resultStr);
        setExpression("");
        setWaitingForOperand(true);
        return;
      }

      if (operator === "√") {
        const result = current < 0 ? NaN : Math.sqrt(current);
        const resultStr = isNaN(result) ? "Error" : formatNumber(result);
        setHistory((h) => [`√(${display}) = ${resultStr}`, ...h.slice(0, 9)]);
        setDisplay(resultStr);
        setWaitingForOperand(true);
        return;
      }

      if (expression && !waitingForOperand) {
        const parts = expression.split(" ");
        const prev = parseFloat(parts[0]);
        const op = parts[1];
        let result: number;

        switch (op) {
          case "+":
            result = prev + current;
            break;
          case "−":
            result = prev - current;
            break;
          case "×":
            result = prev * current;
            break;
          case "÷":
            result = current === 0 ? NaN : prev / current;
            break;
          default:
            result = current;
        }

        const resultStr = isNaN(result) ? "Error" : formatNumber(result);
        setDisplay(resultStr);
        setExpression(`${resultStr} ${operator}`);
      } else {
        setExpression(`${display} ${operator}`);
      }

      setWaitingForOperand(true);
    },
    [display, expression, waitingForOperand]
  );

  const buttons = [
    { label: "C", action: clear, style: "fn" },
    { label: "±", action: toggleSign, style: "fn" },
    { label: "%", action: inputPercent, style: "fn" },
    { label: "÷", action: () => performOperation("÷"), style: "op" },
    { label: "7", action: () => inputDigit("7"), style: "num" },
    { label: "8", action: () => inputDigit("8"), style: "num" },
    { label: "9", action: () => inputDigit("9"), style: "num" },
    { label: "×", action: () => performOperation("×"), style: "op" },
    { label: "4", action: () => inputDigit("4"), style: "num" },
    { label: "5", action: () => inputDigit("5"), style: "num" },
    { label: "6", action: () => inputDigit("6"), style: "num" },
    { label: "−", action: () => performOperation("−"), style: "op" },
    { label: "1", action: () => inputDigit("1"), style: "num" },
    { label: "2", action: () => inputDigit("2"), style: "num" },
    { label: "3", action: () => inputDigit("3"), style: "num" },
    { label: "+", action: () => performOperation("+"), style: "op" },
    { label: "√", action: () => performOperation("√"), style: "fn" },
    { label: "0", action: () => inputDigit("0"), style: "num" },
    { label: ".", action: inputDot, style: "num" },
    { label: "=", action: () => performOperation("="), style: "eq" },
  ];

  return (
    <div className="mx-auto max-w-sm">
      {/* Display */}
      <div className="rounded-xl bg-ink-900 p-4 mb-4">
        <div className="text-right text-sm text-ink-400 h-5 truncate">
          {expression}
        </div>
        <div className="text-right text-3xl font-bold text-white truncate mt-1">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className={`
              h-14 rounded-xl text-lg font-semibold transition-all active:scale-95
              ${
                btn.style === "num"
                  ? "bg-ink-100 text-ink-900 hover:bg-ink-200"
                  : btn.style === "op"
                  ? "bg-brand-500 text-white hover:bg-brand-600"
                  : btn.style === "eq"
                  ? "bg-accent-500 text-white hover:bg-accent-600"
                  : "bg-ink-200 text-ink-700 hover:bg-ink-300"
              }
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-ink-700 mb-2">History</p>
          <div className="max-h-48 overflow-auto rounded-lg border border-ink-200 divide-y divide-ink-100">
            {history.map((entry, i) => (
              <div key={i} className="px-3 py-2 text-sm text-ink-600">
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatNumber(n: number): string {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) {
    return String(n);
  }
  const str = n.toPrecision(10);
  return String(parseFloat(str));
}
