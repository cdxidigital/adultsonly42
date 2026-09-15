import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { addToCart } from "@/lib/house/shop";
import { isUnauthorized } from "@/lib/house/money";
import { stashAdd } from "@/lib/house/pending";
import { HeatButton } from "./chrome";

export function BuyButton({
  productId,
  label = "Add to tab",
  spec = "",
  disabled = false,
}: {
  productId: string;
  label?: string;
  spec?: string;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function buy() {
    setBusy(true);
    try {
      await addToCart({ data: { productId, qty: 1, spec } });
      toast.success("On the tab.");
      navigate({ to: "/cart" });
    } catch (err) {
      if (isUnauthorized(err)) {
        stashAdd(productId, spec);
        navigate({ to: "/login", search: { redirect: "/cart" } });
        return;
      }
      toast.error(err instanceof Error ? err.message : "The desk could not take that.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <HeatButton type="button" disabled={busy || disabled} onClick={buy}>
      {busy ? "Holding…" : label}
    </HeatButton>
  );
}
