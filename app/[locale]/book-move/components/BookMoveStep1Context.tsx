"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RecommendedMover } from "@/types/movers";

export type BookMoveStep1SubView = "grid" | "detail" | "payment" | "track";

export type BookMovePaymentResult = {
  trackingCode: string;
  paymentIntentId: string;
  paidAt: string;
};

type BookMoveStep1ContextValue = {
  subView: BookMoveStep1SubView;
  selectedMover: RecommendedMover | null;
  paymentResult: BookMovePaymentResult | null;
  goToGrid: () => void;
  goToDetail: (mover: RecommendedMover) => void;
  goToPayment: () => void;
  goBackFromPayment: () => void;
  completePayment: (paymentResult: BookMovePaymentResult) => void;
};

const BookMoveStep1Context = createContext<BookMoveStep1ContextValue | null>(
  null,
);

export function BookMoveStep1Provider({ children }: { children: ReactNode }) {
  const [subView, setSubView] = useState<BookMoveStep1SubView>("grid");
  const [selectedMover, setSelectedMover] =
    useState<RecommendedMover | null>(null);
  const [paymentResult, setPaymentResult] =
    useState<BookMovePaymentResult | null>(null);

  const goToGrid = useCallback(() => {
    setSelectedMover(null);
    setPaymentResult(null);
    setSubView("grid");
  }, []);

  const goToDetail = useCallback((mover: RecommendedMover) => {
    setSelectedMover(mover);
    setSubView("detail");
  }, []);

  const goToPayment = useCallback(() => {
    setSubView("payment");
  }, []);

  const goBackFromPayment = useCallback(() => {
    setSubView("detail");
  }, []);

  const completePayment = useCallback((result: BookMovePaymentResult) => {
    setPaymentResult(result);
    setSubView("track");
  }, []);

  const value = useMemo(
    () => ({
      subView,
      selectedMover,
      paymentResult,
      goToGrid,
      goToDetail,
      goToPayment,
      goBackFromPayment,
      completePayment,
    }),
    [
      completePayment,
      goBackFromPayment,
      goToDetail,
      goToGrid,
      goToPayment,
      paymentResult,
      selectedMover,
      subView,
    ],
  );

  return (
    <BookMoveStep1Context.Provider value={value}>
      {children}
    </BookMoveStep1Context.Provider>
  );
}

export function useBookMoveStep1() {
  const ctx = useContext(BookMoveStep1Context);
  if (!ctx) {
    throw new Error("useBookMoveStep1 must be used within BookMoveStep1Provider");
  }
  return ctx;
}
