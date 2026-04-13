"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { RecommendedMover } from "@/types/movers";
import { MoverRoutePriceCard } from "./MoverRoutePriceCard";
import { AppTranslator, Locale } from "@/app/utils";
import { useParams } from "next/navigation";
import { MoveRequestProvider, QuoteProvider } from "@/services";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AlertCircle, ArrowRightLeft, CreditCard, LoaderCircle } from "lucide-react";
import { message } from "antd";
import { useBookMoveStep1 } from "./BookMoveStep1Context";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
const paymentIntentRequestCache = new Map<string, Promise<string>>();

const elementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#121212",
      "::placeholder": {
        color: "#8C8C8C",
      },
    },
    invalid: {
      color: "#D92D20",
    },
  },
};

function PaymentOptionCard({
  selected,
  title,
  description,
  icon,
  children,
  onClick,
}: {
  selected: boolean;
  title: string;
  description?: string;
  icon: ReactNode;
  children?: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-full rounded-[20px] border bg-white p-5 text-left transition lg:p-6 ${
        selected
          ? "border-secondary shadow-[0_12px_30px_rgba(115,192,87,0.12)]"
          : "border-black/10"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-[#F9FAFB] text-[#747474]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={onClick}
            className="flex w-full items-start justify-between gap-3 text-left"
          >
            <div>
              <p className="text-lg font-medium text-dark">{title}</p>
              {description && (
                <p className="mt-1 text-sm text-grey">{description}</p>
              )}
            </div>
            <div
              className={`mt-1 h-5 w-5 rounded-full border ${
                selected ? "border-secondary" : "border-[#D0D5DD]"
              }`}
            >
              <div
                className={`m-0.5 h-3 w-3 rounded-full ${
                  selected ? "bg-secondary" : "bg-transparent"
                }`}
              />
            </div>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

function StripeField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-grey">{label}</span>
      <div className="rounded-xl border border-[#D0D5DD] bg-white px-4 py-4">
        {children}
      </div>
    </label>
  );
}

function PaymentCardForm({
  clientSecret,
  mover,
  trackingCodeOverride,
}: {
  clientSecret: string;
  mover: RecommendedMover;
  trackingCodeOverride?: string;
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const stripe = useStripe();
  const elements = useElements();
  const { completePayment } = useBookMoveStep1();
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const payLabel = AppTranslator.getLocaleText({
    locale,
    translations: {
      en: `Pay ${mover.price}`,
      nl: `${mover.price} betalen`,
    },
  });

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      setError(
        AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Card details are not ready yet.",
            nl: "Kaartgegevens zijn nog niet klaar.",
          },
        }),
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: {
          name: name || mover.name,
          address: postalCode ? { postal_code: postalCode } : undefined,
        },
      },
    });

    if (result.error) {
      setError(result.error.message ?? "Unable to complete payment.");
      setSubmitting(false);
      return;
    }

    const paymentIntentId = result.paymentIntent?.id ?? "";
    const trackingCode =
      trackingCodeOverride?.trim() ||
      paymentIntentId.slice(-12).toUpperCase() ||
      "ZINTERMOVE";

    const quoteId = Number.parseInt(mover.id, 10);
    if (Number.isFinite(quoteId) && quoteId > 0) {
      const acceptRes = await QuoteProvider.acceptQuote(quoteId);
      if (!acceptRes.responseStatus) {
        message.warning(
          AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Payment went through, but confirming the quote on our server failed. Refresh the page or contact support if this persists.",
              nl: "De betaling is gelukt, maar bevestigen van de offerte op de server is mislukt. Vernieuw de pagina of neem contact op als dit blijft.",
            },
          }),
        );
      }
    }

    completePayment({
      trackingCode,
      paymentIntentId,
      paidAt: new Date().toISOString(),
    });
    message.success(
      AppTranslator.getLocaleText({
        locale,
        translations: {
          en: "Payment successful. You can track your move below.",
          nl: "Betaling geslaagd. Je kunt je verhuizing hieronder volgen.",
        },
      }),
    );
    setSubmitting(false);
  };

  return (
    <div className="mt-5 rounded-[20px] border border-black/10 bg-white p-5 lg:p-6">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="lg:col-span-3">
          <StripeField
            label={AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Cardholder Name",
                nl: "Naam kaarthouder",
              },
            })}
          >
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full border-none bg-transparent outline-none"
              placeholder={AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Name on card",
                  nl: "Naam op kaart",
                },
              })}
            />
          </StripeField>
        </div>
        <div className="lg:col-span-3">
          <StripeField
            label={AppTranslator.getLocaleText({
              locale,
              translations: {
                en: "Card Number",
                nl: "Kaartnummer",
              },
            })}
          >
            <CardNumberElement options={elementOptions} />
          </StripeField>
        </div>
        <StripeField
          label={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Expiration",
              nl: "Vervaldatum",
            },
          })}
        >
          <CardExpiryElement options={elementOptions} />
        </StripeField>
        <StripeField
          label={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "CVV",
              nl: "CVV",
            },
          })}
        >
          <CardCvcElement options={elementOptions} />
        </StripeField>
        <StripeField
          label={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Postal Code",
              nl: "Postcode",
            },
          })}
        >
          <input
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            className="w-full border-none bg-transparent outline-none"
            placeholder="1015 CJ"
          />
        </StripeField>
      </div>

      <label className="mt-5 flex items-center gap-3 text-sm text-dark">
        <input
          type="checkbox"
          checked={saveCard}
          onChange={(event) => setSaveCard(event.target.checked)}
          className="h-4 w-4 rounded border-[#D0D5DD] accent-secondary"
        />
        <span>
          {AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Save this credit card for future use",
              nl: "Sla deze kaart op voor toekomstig gebruik",
            },
          })}
        </span>
      </label>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="button"
        disabled={!stripe || submitting}
        onClick={handleSubmit}
        className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-theme px-6 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {payLabel}
      </button>
    </div>
  );
}

export function MoverPaymentPanel({
  mover,
  trackingCodeOverride,
}: {
  mover: RecommendedMover;
  trackingCodeOverride?: string;
}) {
  const { locale } = useParams<{ locale: Locale }>();
  const [selectedMethod, setSelectedMethod] = useState<"transfer" | "card">(
    "card",
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `${mover.id}:${mover.priceAmount}`;

    const loadPaymentIntent = async () => {
      try {
        setLoading(true);
        setError(null);
        let request = paymentIntentRequestCache.get(cacheKey);

        if (!request) {
          request = MoveRequestProvider.createPaymentIntent(
            mover.priceAmount,
          ).then((response) => response.clientSecret);
          paymentIntentRequestCache.set(cacheKey, request);
        }

        const nextClientSecret = await request;
        if (!cancelled) {
          setClientSecret(nextClientSecret);
        }
      } catch (paymentError) {
        paymentIntentRequestCache.delete(cacheKey);
        if (!cancelled) {
          setError(
            (paymentError as Error)?.message ??
              AppTranslator.getLocaleText({
                locale,
                translations: {
                  en: "Unable to start payment right now.",
                  nl: "Betalen kan nu niet worden gestart.",
                },
              }),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPaymentIntent();

    return () => {
      cancelled = true;
    };
  }, [locale, mover.id, mover.priceAmount]);

  const stripeReady = useMemo(() => Boolean(publishableKey && stripePromise), []);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-medium text-dark lg:text-2xl">
        {AppTranslator.getLocaleText({
          locale,
          translations: {
            en: "Complete Payment",
            nl: "Betaling afronden",
          },
        })}
      </h2>
      <MoverRoutePriceCard
        fromLabel={mover.fromLabel}
        fromAddress={mover.fromAddress}
        toLabel={mover.toLabel}
        toAddress={mover.toAddress}
        distance={mover.distance}
        price={mover.price}
        meta={mover.meta}
      />

      <div className="space-y-5">
        <PaymentOptionCard
          selected={selectedMethod === "transfer"}
          onClick={() => setSelectedMethod("transfer")}
          title={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "Pay with Transfer",
              nl: "Betalen via overschrijving",
            },
          })}
          description="100000342, Independent Movers LTD, Triodos Bank N.V."
          icon={<ArrowRightLeft className="h-5 w-5" />}
        />

        <PaymentOptionCard
          selected={selectedMethod === "card"}
          onClick={() => setSelectedMethod("card")}
          title={AppTranslator.getLocaleText({
            locale,
            translations: {
              en: "New credit or debit card",
              nl: "Nieuwe creditcard of bankpas",
            },
          })}
          icon={<CreditCard className="h-5 w-5" />}
        >
          {selectedMethod === "card" && (
            <>
              {loading && (
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#F9FAFB] px-4 py-4 text-sm text-grey">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  <span>
                    {AppTranslator.getLocaleText({
                      locale,
                      translations: {
                        en: "Preparing secure payment form...",
                        nl: "Beveiligd betaalformulier wordt geladen...",
                      },
                    })}
                  </span>
                </div>
              )}

              {!stripeReady && !loading && (
                <div className="mt-5 rounded-xl bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">
                  {AppTranslator.getLocaleText({
                    locale,
                    translations: {
                      en: "Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable card payments.",
                      nl: "Voeg NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY toe om kaartbetalingen te activeren.",
                    },
                  })}
                </div>
              )}

              {error && !loading && (
                <div className="mt-5 rounded-xl bg-[#FEF3F2] px-4 py-3 text-sm text-[#B42318]">
                  {error}
                </div>
              )}

              {clientSecret && stripeReady && !loading && (
                <Elements
                  key={clientSecret}
                  stripe={stripePromise}
                  options={{ clientSecret }}
                >
                  <PaymentCardForm
                    clientSecret={clientSecret}
                    mover={mover}
                    trackingCodeOverride={trackingCodeOverride}
                  />
                </Elements>
              )}
            </>
          )}
        </PaymentOptionCard>
      </div>
    </div>
  );
}
